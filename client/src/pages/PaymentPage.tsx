
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import PaymentForm from '@/components/PaymentForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PaymentPage = () => {
  const [paymentStatus, setPaymentStatus] = useState<'form' | 'success' | 'error'>('form');
  const [paymentId, setPaymentId] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handlePaymentSuccess = (id: string) => {
    setPaymentId(id);
    setPaymentStatus('success');
  };

  const handlePaymentError = (error: string) => {
    setErrorMessage(error);
    setPaymentStatus('error');
  };

  const resetForm = () => {
    setPaymentStatus('form');
    setPaymentId('');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Secure Payment - Ruvab IT Services</title>
        <meta name="description" content="Complete your payment for Ruvab IT services securely through our Razorpay integration. Book AI implementation, custom software development, and more." />
        <meta name="keywords" content="payment, secure payment, Razorpay, AI services, software development, technology consulting" />
        <link rel="canonical" href="https://ruvab.it.com/payment" />
        <script src="https://checkout.razorpay.com/v1/checkout.js" />
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-12">
        {paymentStatus === 'form' && (
          <>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Secure Payment Portal
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Complete your booking for our premium technology services with our secure payment gateway powered by Razorpay.
              </p>
            </div>
            
            <PaymentForm
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          </>
        )}

        {paymentStatus === 'success' && (
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-green-600">Payment Successful!</CardTitle>
                <CardDescription>
                  Your payment has been processed successfully
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Payment ID:</strong> {paymentId}
                  </p>
                </div>
                
                <div className="text-left space-y-2">
                  <h3 className="font-semibold">What happens next?</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• You will receive a confirmation email shortly</li>
                    <li>• Our team will contact you within 24 hours</li>
                    <li>• We'll schedule a detailed consultation call</li>
                    <li>• Project timeline and deliverables will be discussed</li>
                  </ul>
                </div>

                <div className="flex gap-4 justify-center">
                  <Button onClick={() => window.location.href = '/'}>
                    Return to Home
                  </Button>
                  <Button variant="outline" onClick={() => window.location.href = '/contact'}>
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {paymentStatus === 'error' && (
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardHeader>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-2xl text-red-600">Payment Failed</CardTitle>
                <CardDescription>
                  We encountered an issue processing your payment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm text-red-800">
                    <strong>Error:</strong> {errorMessage}
                  </p>
                </div>
                
                <div className="text-left space-y-2">
                  <h3 className="font-semibold">You can try:</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Checking your internet connection</li>
                    <li>• Verifying your payment details</li>
                    <li>• Using a different payment method</li>
                    <li>• Contacting your bank if the issue persists</li>
                  </ul>
                </div>

                <div className="flex gap-4 justify-center">
                  <Button onClick={resetForm}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                  <Button variant="outline" onClick={() => window.location.href = '/contact'}>
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default PaymentPage;
