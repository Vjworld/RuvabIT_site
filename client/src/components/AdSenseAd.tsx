import { useEffect, useRef } from 'react';
import { pushAd } from '@/lib/adsense';

interface AdSenseAdProps {
  adSlot?: string;
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  adLayout?: 'in-article' | 'in-feed';
  className?: string;
  style?: React.CSSProperties;
}

function AdSenseAd({
  adSlot = "7834958237",
  adFormat = 'auto',
  adLayout,
  className = '',
  style
}: AdSenseAdProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const hasAdLoaded = useRef(false);

  useEffect(() => {
    const loadAd = () => {
      if (hasAdLoaded.current) return;

      // Check if user has consented to advertising cookies
      const cookieConsent = localStorage.getItem('cookieConsent');
      if (!cookieConsent) return;
      
      try {
        const consentData = JSON.parse(cookieConsent);
        if (!consentData.advertising) {
          return;
        }
      } catch {
        // Fallback for old consent format
        if (cookieConsent !== 'accepted') {
          return;
        }
      }

      // Check if AdSense is available and wait for it to load if needed
      if (typeof window !== 'undefined') {
        const tryLoadAd = () => {
          if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
            try {
              pushAd();
              hasAdLoaded.current = true;
            } catch (error) {
              console.error('Error loading ad:', error);
            }
          } else {
            // Wait for AdSense to load
            setTimeout(tryLoadAd, 500);
          }
        };
        
        tryLoadAd();
      }
    };

    // Load ad immediately if consent is already given
    loadAd();

    // Listen for cookie consent changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cookieConsent') {
        try {
          const consentData = JSON.parse(e.newValue || '{}');
          if (consentData.advertising === true) {
            loadAd();
          }
        } catch {
          // Fallback for old consent format
          if (e.newValue === 'accepted') {
            loadAd();
          }
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const adStyles: React.CSSProperties = {
    display: 'block',
    textAlign: 'center',
    ...style
  };

  const adProps: any = {
    className: `adsbygoogle ${className}`,
    style: adStyles,
    'data-ad-client': import.meta.env.VITE_ADSENSE_CLIENT_ID || 'ca-pub-4204204667108655',
    'data-ad-slot': adSlot,
    'data-ad-format': adFormat,
    'data-full-width-responsive': 'true'
  };

  if (adLayout) {
    adProps['data-ad-layout'] = adLayout;
  }

  return (
    <div ref={adRef} className="w-full my-8 py-6">
      {/* Clear ad labeling and separation */}
      <div className="border border-gray-200 bg-gray-50 rounded-lg p-4 mx-auto max-w-4xl">
        <div className="text-center">
          <p className="text-xs text-gray-600 font-medium mb-3 uppercase tracking-wide">
            ADVERTISEMENT
          </p>
          <div className="bg-white rounded border p-2">
            <ins {...adProps} />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Ads help us provide free content and services
          </p>
        </div>
      </div>
    </div>
  );
}

export { AdSenseAd };
export default AdSenseAd;
