
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard, Shield, Clock, CheckCircle } from 'lucide-react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentFormProps {
  onSuccess?: (paymentId: string) => void;
  onError?: (error: string) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSuccess, onError }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    serviceType: '',
    description: '',
    amount: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const serviceTypes = [
    { value: 'ai-implementation', label: 'AI Implementation', price: 50000 },
    { value: 'custom-software', label: 'Custom Software Development', price: 75000 },
    { value: 'data-analytics', label: 'Data Analytics & BI', price: 40000 },
    { value: 'cloud-solutions', label: 'Cloud Solutions', price: 35000 },
    { value: 'cybersecurity', label: 'Cybersecurity Audit', price: 25000 },
    { value: 'consulting', label: 'Technology Consulting', price: 15000 },
    { value: 'test-payment', label: 'Test Payment (₹10)', price: 10 },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-fill amount based on service type
    if (field === 'serviceType') {
      const service = serviceTypes.find(s => s.value === value);
      if (service) {
        setFormData(prev => ({ ...prev, amount: service.price.toString() }));
      }
    }
  };

  const validateForm = () => {
    const required = ['customerName', 'customerEmail', 'serviceType', 'amount'];
    return required.every(field => formData[field as keyof typeof formData].trim() !== '');
  };

  const handlePayment = async () => {
    if (!validateForm()) {
      onError?.('Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    try {
      // Create order
      const response = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseInt(formData.amount),
          serviceType: formData.serviceType,
          customerName: formData.customerName,
          customerEmail: formData.customerEmail,
          customerPhone: formData.customerPhone,
          description: formData.description,
        }),
      });

      const orderData = await response.json();

      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to create order');
      }

      // Initialize Razorpay payment
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Ruvab IT',
        description: formData.description || `Payment for ${formData.serviceType}`,
        order_id: orderData.razorpayOrderId,
        handler: async (response: any) => {
          try {
            // Verify payment
            const verifyResponse = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId: orderData.orderId,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              onSuccess?.(response.razorpay_payment_id);
            } else {
              onError?.(verifyData.error || 'Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            onError?.('Payment verification failed');
          }
        },
        prefill: {
          name: formData.customerName,
          email: formData.customerEmail,
          contact: formData.customerPhone,
        },
        theme: {
          color: '#3B82F6',
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('Payment error:', error);
      onError?.(error instanceof Error ? error.message : 'Payment failed');
      setIsLoading(false);
    }
  };

  const selectedService = serviceTypes.find(s => s.value === formData.serviceType);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-blue-600" />
            Secure Payment
          </CardTitle>
          <CardDescription>
            Complete your service booking with our secure payment gateway
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Test Mode Warning */}
          {window.location.hostname.includes('replit') && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-yellow-800">
                <Shield className="h-4 w-4" />
                <span className="font-medium">Test Mode Active</span>
              </div>
              <p className="text-sm text-yellow-700 mt-1">
                This is running in test mode. Use test card numbers for payments.
              </p>
            </div>
          )}
          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customerName">Full Name *</Label>
                <Input
                  id="customerName"
                  value={formData.customerName}
                  onChange={(e) => handleInputChange('customerName', e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <Label htmlFor="customerEmail">Email Address *</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="customerPhone">Phone Number</Label>
              <Input
                id="customerPhone"
                value={formData.customerPhone}
                onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          {/* Service Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Service Details</h3>
            
            <div>
              <Label htmlFor="serviceType">Service Type *</Label>
              <Select 
                value={formData.serviceType} 
                onValueChange={(value) => handleInputChange('serviceType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map((service) => (
                    <SelectItem key={service.value} value={service.value}>
                      {service.label} - ₹{service.price.toLocaleString()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="amount">Amount (₹) *</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                placeholder="Enter amount"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Additional details about your requirements"
                rows={3}
              />
            </div>
          </div>

          {/* Payment Summary */}
          {selectedService && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Payment Summary</h4>
              <div className="flex justify-between items-center">
                <span>{selectedService.label}</span>
                <span className="font-semibold">₹{parseInt(formData.amount || '0').toLocaleString()}</span>
              </div>
            </div>
          )}

          {/* Security Features */}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Instant Processing</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4" />
              <span>Verified by Razorpay</span>
            </div>
          </div>

          <Button
            onClick={handlePayment}
            disabled={!validateForm() || isLoading}
            className="w-full"
            size="lg"
          >
            {isLoading ? (
              'Processing...'
            ) : (
              `Pay ₹${parseInt(formData.amount || '0').toLocaleString()}`
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Load Razorpay script */}
      <script src="https://checkout.razorpay.com/v1/checkout.js" async />
    </div>
  );
};

export default PaymentForm;
