// Define the gtag function globally
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    google_tag_manager?: any;
  }
}

// Initialize Google Analytics
export const initGA = () => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  if (!measurementId) {
    console.warn('Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID');
    return;
  }

  // Add Google Analytics script to the head
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script1);

  // Initialize gtag safely without innerHTML
  const script2 = document.createElement('script');
  script2.text = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', ${JSON.stringify(measurementId)});
  `;
  document.head.appendChild(script2);
};

// Track page views - useful for single-page applications
export const trackPageView = (url: string) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!measurementId) return;
  
  window.gtag('config', measurementId, {
    page_path: url
  });
};

// Initialize Google Tag Manager
export const initGTM = () => {
  if (typeof window === 'undefined' || window.google_tag_manager) return;
  
  try {
    // GTM is already loaded in the HTML head, we just need to ensure dataLayer exists
    window.dataLayer = window.dataLayer || [];
    
    // Push consent update for GTM
    window.dataLayer.push({
      'event': 'gtm_consent_update',
      'analytics_consent': 'granted',
      'ad_consent': 'granted'
    });
    
    console.log('Google Tag Manager initialized successfully');
  } catch (error) {
    console.error('Error initializing GTM:', error);
  }
};

// Track events
export const trackEvent = (
  action: string, 
  category?: string, 
  label?: string, 
  value?: number
) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// GTM-specific event tracking
export const trackGTMEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window === 'undefined' || !window.dataLayer) return;
  
  window.dataLayer.push({
    event: eventName,
    ...parameters
  });
};

// Initialize all analytics services based on consent
export const initializeAllAnalytics = (consent: {
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}) => {
  if (typeof window === 'undefined') return;
  
  try {
    if (consent.analytics) {
      // Initialize Google Analytics
      initGA();
      
      // Initialize Google Tag Manager
      initGTM();
      
      console.log('Analytics services initialized with consent');
    }
    
    if (consent.marketing) {
      // Initialize AdSense (already handled by consent in the AdSense component)
      console.log('Marketing analytics enabled');
    }
    
    if (consent.functional) {
      // Initialize functional analytics
      console.log('Functional analytics enabled');
    }
  } catch (error) {
    console.error('Error initializing analytics services:', error);
  }
};
