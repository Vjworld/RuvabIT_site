// Define the gtag function globally
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    google_tag_manager?: any;
  }
}

// Google Analytics is now loaded directly in HTML head
// This function is kept for backward compatibility but is no longer needed
export const initGA = () => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-487BHE09VJ';
  console.log(`Google Analytics is already initialized in HTML head with ${measurementId}`);
};

// Track page views - useful for single-page applications
export const trackPageView = (url: string) => {
  try {
    if (typeof window === 'undefined' || !window.gtag) return;
    
    // Use the environment variable measurement ID
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-487BHE09VJ';
    window.gtag('config', measurementId, {
      page_path: url
    });
  } catch (error) {
    console.warn('Analytics: Failed to track page view', error);
  }
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
  try {
    if (typeof window === 'undefined' || !window.gtag) return;
    
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  } catch (error) {
    console.warn('Analytics: Failed to track event', error);
  }
};

// GTM-specific event tracking
export const trackGTMEvent = (eventName: string, parameters?: Record<string, any>) => {
  try {
    if (typeof window === 'undefined' || !window.dataLayer) return;
    
    window.dataLayer.push({
      event: eventName,
      ...parameters
    });
  } catch (error) {
    console.warn('Analytics: Failed to track GTM event', error);
  }
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
