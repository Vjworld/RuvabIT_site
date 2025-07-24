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

      // Check if user has consented to cookies
      const cookieConsent = localStorage.getItem('cookieConsent');
      if (cookieConsent !== 'accepted') {
        return;
      }

      // Check if AdSense is available
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        try {
          pushAd();
          hasAdLoaded.current = true;
        } catch (error) {
          console.error('Error loading ad:', error);
        }
      }
    };

    // Load ad immediately if consent is already given
    loadAd();

    // Listen for cookie consent changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cookieConsent' && e.newValue === 'accepted') {
        loadAd();
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
    'data-ad-client': import.meta.env.VITE_ADSENSE_CLIENT_ID || 'ca-pub-XXXXXXXXXXXXXXXXX',
    'data-ad-slot': adSlot,
    'data-ad-format': adFormat,
    'data-full-width-responsive': 'true'
  };

  if (adLayout) {
    adProps['data-ad-layout'] = adLayout;
  }

  return (
    <div ref={adRef} className="flex justify-center py-8">
      <div className="text-center">
        <p className="text-xs text-gray-500 mb-2">Advertisement</p>
        <ins {...adProps} />
      </div>
    </div>
  );
}

export { AdSenseAd };
export default AdSenseAd;
