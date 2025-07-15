import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkCookieConsent = () => {
      const consent = localStorage.getItem('cookieConsent');
      if (!consent) {
        // Show banner after 2 seconds
        setTimeout(() => setIsVisible(true), 2000);
      }
    };

    checkCookieConsent();
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
    
    // Trigger storage event for other components
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'cookieConsent',
      newValue: 'accepted'
    }));
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-lg z-50 transform transition-transform duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 pr-4">
          <p className="text-sm">
            We use cookies to enhance your experience and show personalized ads. By continuing to use our site, you agree to our{' '}
            <a href="/privacy" className="text-blue-400 hover:text-blue-300 underline">
              Cookie Policy
            </a>
            .
          </p>
        </div>
        <div className="flex space-x-4 items-center">
          <Button
            onClick={handleAccept}
            className="bg-primary text-white hover:bg-blue-700 transition-colors"
          >
            Accept All
          </Button>
          <Button
            onClick={handleReject}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors"
          >
            Reject
          </Button>
          <Button
            onClick={() => setIsVisible(false)}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
