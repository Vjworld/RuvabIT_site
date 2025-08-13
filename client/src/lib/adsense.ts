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
  
  // AdSense script and meta tag are now in HTML
  // Check if we already have page-level ads configuration
  const hasPageLevelAds = window.adsbygoogle && Array.isArray(window.adsbygoogle) && window.adsbygoogle.some((item: any) => 
    item && typeof item === 'object' && item.enable_page_level_ads === true
  );
  
  // Only initialize page-level ads if not already done
  if (!hasPageLevelAds) {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({
        google_ad_client: clientId,
        enable_page_level_ads: true
      });
    } catch (error) {
      console.error('Error initializing AdSense page-level ads:', error);
    }
  }
  
  // Mark as initialized to prevent duplicate initialization
  window.__adSenseInitialized = true;
};

export const pushAd = (adConfig?: any) => {
  if (typeof window !== 'undefined' && window.adsbygoogle) {
    try {
      window.adsbygoogle.push(adConfig || {});
    } catch (error) {
      console.error('Error pushing ad:', error);
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
