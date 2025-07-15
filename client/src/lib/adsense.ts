declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const initAdSense = () => {
  const clientId = import.meta.env.VITE_ADSENSE_CLIENT_ID || 'ca-pub-4204204667108655';

  if (!clientId) {
    console.warn('Missing required AdSense client ID');
    return;
  }

  // Initialize AdSense if not already loaded
  if (!window.adsbygoogle) {
    window.adsbygoogle = [];
    
    // Add AdSense script to the head
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
    script.crossOrigin = 'anonymous';
    
    // Add error handling
    script.onerror = () => {
      console.error('Failed to load AdSense script');
    };
    
    document.head.appendChild(script);
    
    // Initialize auto ads
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({
        google_ad_client: clientId,
        enable_page_level_ads: true
      });
    } catch (error) {
      console.error('Error initializing AdSense:', error);
    }
  }
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
