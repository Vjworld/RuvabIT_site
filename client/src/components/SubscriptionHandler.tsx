import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/AuthModal';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';
import { detectUserLocation, getTaxInfo, getTaxMessage, formatRupees, type LocationData } from '@shared/pricing';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface Plan {
  id: number;
  name: string;
  planType: string;
  priceMin: number;
  priceMax: number;
  currency: string;
  billingInterval: string;
  description: string;
  features: string[];
}

interface SubscriptionHandlerProps {
  planId: number;
  planName: string;
  onSuccess?: () => void;
}

export function SubscriptionHandler({ planId, planName, onSuccess }: SubscriptionHandlerProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [userLocation, setUserLocation] = useState<LocationData | null>(null);
  const [locationLoading, setLocationLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Detect user location on component mount
  useEffect(() => {
    const detectLocation = async () => {
      try {
        setLocationLoading(true);
        const location = await detectUserLocation();
        setUserLocation(location);
      } catch (error) {
        console.warn('Location detection failed:', error);
        // Fallback to India
        setUserLocation({
          country: 'India',
          countryCode: 'IN',
          region: '',
          city: '',
          timezone: 'Asia/Kolkata'
        });
      } finally {
        setLocationLoading(false);
      }
    };

    detectLocation();
  }, []);

  // Get plan details
  const { data: plan, isLoading: planLoading } = useQuery<Plan>({
    queryKey: [`/api/subscriptions/plans/${planId}`],
    enabled: !!planId
  });

  // Create subscription mutation
  const createSubscriptionMutation = useMutation({
    mutationFn: async (planId: number) => {
      const response = await apiRequest('POST', '/api/subscriptions/create', { planId });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/subscriptions/my'] });
    }
  });

  // Create payment order mutation
  const createPaymentMutation = useMutation({
    mutationFn: async (subscriptionId: number) => {
      const response = await apiRequest('POST', '/api/subscriptions/payment/create', { subscriptionId });
      return response.json();
    }
  });

  // Verify payment mutation
  const verifyPaymentMutation = useMutation({
    mutationFn: async (paymentData: any) => {
      const response = await apiRequest('POST', '/api/subscriptions/payment/verify', paymentData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/subscriptions/my'] });
      queryClient.invalidateQueries({ queryKey: ['/api/subscriptions/payments'] });
      toast({
        title: "Payment Successful!",
        description: `Your subscription to ${planName} has been activated.`,
      });
      onSuccess?.();
    }
  });

  const handleSubscribe = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    // Allow proceeding even if plan details aren't loaded (non-blocking)
    if (planLoading) {
      toast({
        title: "Loading",
        description: "Plan details are loading. Please wait a moment.",
        variant: "default"
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Step 1: Create subscription
      const subscriptionResult = await createSubscriptionMutation.mutateAsync(planId);
      
      if (!subscriptionResult.success) {
        throw new Error(subscriptionResult.error || 'Failed to create subscription');
      }

      const subscription = subscriptionResult.subscription;

      // Step 2: Create payment order
      const paymentResult = await createPaymentMutation.mutateAsync(subscription.id);
      
      if (!paymentResult.success) {
        throw new Error(paymentResult.error || 'Failed to create payment order');
      }

      // Step 3: Open Razorpay checkout
      const options = {
        key: paymentResult.key,
        amount: paymentResult.amount,
        currency: paymentResult.currency,
        name: 'Ruvab IT',
        description: `Subscription to ${plan?.name || planName} plan`,
        order_id: paymentResult.razorpayOrderId,
        prefill: {
          name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username,
          email: user.email,
        },
        theme: {
          color: '#3B82F6'
        },
        handler: async function (response: any) {
          try {
            // Step 4: Verify payment
            await verifyPaymentMutation.mutateAsync({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: paymentResult.orderId,
              subscriptionId: subscription.id
            });
          } catch (error) {
            console.error('Payment verification error:', error);
            toast({
              title: "Payment Verification Failed",
              description: "Your payment was processed but verification failed. Please contact support.",
              variant: "destructive"
            });
          } finally {
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
          }
        }
      };

      // Check if Razorpay is available
      if (!window.Razorpay) {
        toast({
          title: "Payment Gateway Unavailable", 
          description: "Payment system is not available. Please check your internet connection and try again.",
          variant: "destructive"
        });
        setIsProcessing(false);
        return;
      }

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error: any) {
      console.error('Subscription error:', error);
      toast({
        title: "Subscription Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive"
      });
      setIsProcessing(false);
    }
  };


  // Helper function to calculate GST breakdown for display
  const calculateGSTBreakdown = (baseAmount: number) => {
    const gstAmount = Math.round(baseAmount * 0.18); // 18% GST
    const totalAmount = baseAmount + gstAmount;
    return { baseAmount, gstAmount, totalAmount };
  };

  const formatIndianCurrency = (amountInPaise: number) => {
    return `₹${(amountInPaise / 100).toLocaleString('en-IN')}`;
  };

  return (
    <>
      <div className="text-center">
        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border">
          {plan ? (
            <>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                <strong>{plan.name} Plan</strong> - {plan.billingInterval}
              </div>
              {(() => {
                const breakdown = calculateGSTBreakdown(plan.priceMin);
                return (
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Base Price:</span>
                      <span>{formatIndianCurrency(breakdown.baseAmount)}</span>
                    </div>
                    <div className="flex justify-between text-orange-600 dark:text-orange-400">
                      <span>GST (18%):</span>
                      <span>+ {formatIndianCurrency(breakdown.gstAmount)}</span>
                    </div>
                    <hr className="border-gray-300 dark:border-gray-600" />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total Amount:</span>
                      <span className="text-green-600 dark:text-green-400">
                        {formatIndianCurrency(breakdown.totalAmount)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      *GST included as per Indian tax regulations
                    </div>
                  </div>
                );
              })()}
            </>
          ) : (
            <>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-14" />
                </div>
                <hr className="border-gray-300 dark:border-gray-600" />
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-18" />
                </div>
                <Skeleton className="h-3 w-full" />
              </div>
            </>
          )}
        </div>
        
        <button
          onClick={handleSubscribe}
          disabled={isProcessing || planLoading || createSubscriptionMutation.isPending || createPaymentMutation.isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          data-testid={`button-subscribe-${planName.toLowerCase().replace(' ', '-')}`}
        >
          {(isProcessing || planLoading || createSubscriptionMutation.isPending || createPaymentMutation.isPending) && (
            <Loader2 className="h-4 w-4 animate-spin" />
          )}
          {isProcessing ? 'Processing...' : 
           planLoading ? 'Loading...' :
           createSubscriptionMutation.isPending ? 'Creating Subscription...' :
           createPaymentMutation.isPending ? 'Preparing Payment...' :
           `Subscribe to ${planName}`}
        </button>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultMode="register"
        onSuccess={() => {
          setShowAuthModal(false);
          // Try subscribing again after successful authentication
          setTimeout(handleSubscribe, 100);
        }}
      />
    </>
  );
}