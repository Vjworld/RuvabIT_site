import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Settings, Shield, BarChart3, Target } from 'lucide-react';

interface ConsentPreferences {
  essential: boolean;
  analytics: boolean;
  advertising: boolean;
  functional: boolean;
}

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    essential: true, // Always required
    analytics: false,
    advertising: false,
    functional: false,
  });

  useEffect(() => {
    const checkCookieConsent = () => {
      const consent = localStorage.getItem('cookieConsent');
      if (!consent) {
        // Show banner after 2 seconds for better UX
        setTimeout(() => setIsVisible(true), 2000);
      }
    };

    checkCookieConsent();
  }, []);

  const handleAcceptAll = () => {
    const fullConsent = {
      essential: true,
      analytics: true,
      advertising: true,
      functional: true,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };
    
    localStorage.setItem('cookieConsent', JSON.stringify(fullConsent));
    setIsVisible(false);
    
    // Trigger storage event for other components
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'cookieConsent',
      newValue: JSON.stringify(fullConsent)
    }));
  };

  const handleRejectAll = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      advertising: false,
      functional: false,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };
    
    localStorage.setItem('cookieConsent', JSON.stringify(essentialOnly));
    setIsVisible(false);
    
    // Trigger storage event
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'cookieConsent',
      newValue: JSON.stringify(essentialOnly)
    }));
  };

  const handleSavePreferences = () => {
    const consentData = {
      ...preferences,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };
    
    localStorage.setItem('cookieConsent', JSON.stringify(consentData));
    setIsVisible(false);
    
    // Trigger storage event
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'cookieConsent',
      newValue: JSON.stringify(consentData)
    }));
  };

  const updatePreference = (key: keyof ConsentPreferences, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50 p-4">
      <Card className="w-full max-w-4xl bg-white">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                🍪 Cookie Consent & Privacy Preferences
              </CardTitle>
              <p className="text-sm text-gray-600">
                We respect your privacy. Choose which cookies you'd like to allow to enhance your experience.
              </p>
            </div>
            <Button
              onClick={() => setIsVisible(false)}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {showDetails && (
            <div className="space-y-4 border-t pt-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-green-600" />
                    <div>
                      <h4 className="font-medium text-gray-900">Essential Cookies</h4>
                      <p className="text-sm text-gray-600">Required for website functionality, security, and core features.</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.essential}
                    disabled
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <div>
                      <h4 className="font-medium text-gray-900">Analytics Cookies</h4>
                      <p className="text-sm text-gray-600">Help us understand website usage and improve our services (Google Analytics).</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => updatePreference('analytics', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Target className="w-5 h-5 text-purple-600" />
                    <div>
                      <h4 className="font-medium text-gray-900">Advertising Cookies</h4>
                      <p className="text-sm text-gray-600">Used for personalized ads and measuring ad performance (Google AdSense).</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.advertising}
                    onChange={(e) => updatePreference('advertising', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Settings className="w-5 h-5 text-orange-600" />
                    <div>
                      <h4 className="font-medium text-gray-900">Functional Cookies</h4>
                      <p className="text-sm text-gray-600">Remember your preferences and enhance website functionality.</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.functional}
                    onChange={(e) => updatePreference('functional', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
            <p>
              We use cookies and similar technologies to provide personalized ads through Google AdSense. 
              By accepting, you consent to data collection for ad personalization. EU users have the right to 
              withdraw consent at any time. Read our{' '}
              <a href="/privacy" className="text-blue-600 hover:underline font-medium">Privacy Policy</a>{' '}
              for details.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={handleAcceptAll}
              className="bg-blue-600 text-white hover:bg-blue-700 flex-1"
            >
              Accept All Cookies
            </Button>
            
            <Button
              onClick={handleRejectAll}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 flex-1"
            >
              Reject Non-Essential
            </Button>
            
            {showDetails ? (
              <Button
                onClick={handleSavePreferences}
                variant="secondary"
                className="bg-green-600 text-white hover:bg-green-700 flex-1"
              >
                Save My Preferences
              </Button>
            ) : (
              <Button
                onClick={() => setShowDetails(true)}
                variant="ghost"
                className="text-gray-600 hover:text-gray-800 flex-1"
              >
                <Settings className="w-4 h-4 mr-2" />
                Customize
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
