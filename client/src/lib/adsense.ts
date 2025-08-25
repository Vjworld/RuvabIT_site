declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

// Track initialization globally to prevent duplicates across hot reloads
declare global {
  interface Window {
    adsbygoogle: any[];
    __adSenseInitialized?: boolean;
  }
}

export const initAdSense = () => {
  const clientId = import.meta.env.VITE_ADSENSE_CLIENT_ID;

  if (!clientId) {
    console.warn('AdSense client ID not configured in environment variables');
    return;
  }

  // Prevent duplicate initialization using window property
  if (window.__adSenseInitialized) {
    return;
  }

  // Initialize AdSense if not already loaded
  if (!window.adsbygoogle) {
    window.adsbygoogle = [];
  }
  
  // AdSense script and auto ads are now in HTML head
  // We don't need to enable page-level ads again here as it's causing conflicts
  // The HTML head already includes the AdSense script with auto ads
  
  // Mark as initialized to prevent duplicate initialization
  window.__adSenseInitialized = true;
};

export const pushAd = (adConfig?: any) => {
  if (typeof window !== 'undefined' && window.adsbygoogle) {
    try {
      // Only push ads if they haven't been pushed already
      // Check if this is a new ad element  
      const adElements = document.querySelectorAll('.adsbygoogle');
      const unpushedAds = Array.from(adElements).filter(ad => 
        !ad.hasAttribute('data-adsbygoogle-status')
      );
      
      if (unpushedAds.length > 0) {
        window.adsbygoogle.push(adConfig || {});
      }
    } catch (error) {
      console.error('Error pushing ad:', error);
      // Fallback: try to push anyway, but in a safer manner
      try {
        window.adsbygoogle.push(adConfig || {});
      } catch (fallbackError) {
        console.error('Fallback AdSense push also failed:', fallbackError);
      }
    }
  }
};

export const checkAdBlocker = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Simple ad blocker detection
  const testAd = document.createElement('div');
  testAd.innerHTML = '&nbsp;';
  testAd.className = 'adsbox';
  testAd.style.position = 'absolute';
  testAd.style.left = '-10000px';
  document.body.appendChild(testAd);
  
  const isBlocked = testAd.offsetHeight === 0;
  document.body.removeChild(testAd);
  
  return isBlocked;
};
