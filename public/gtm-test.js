// Google Analytics & GTM Test Script
function testAnalytics() {
  console.log('🔍 Testing Google Analytics & GTM...');
  
  // Test Google Analytics
  if (typeof window.gtag !== 'undefined') {
    console.log('✅ Google Analytics (gtag) is available with G-487BHE09VJ');
    
    // Send a test page view
    try {
      window.gtag('event', 'page_view', {
        page_title: 'Test Page - Analytics Working',
        page_location: window.location.href,
        custom_parameter_1: 'Direct HTML Implementation'
      });
      console.log('✅ Test page view sent to GA (G-487BHE09VJ)');
    } catch (error) {
      console.log('❌ Error sending GA event:', error);
    }
  } else {
    console.log('❌ Google Analytics (gtag) not found - it may still be loading');
  }
  
  // Test Google Tag Manager
  if (typeof window.dataLayer !== 'undefined') {
    console.log('✅ GTM dataLayer is available');
    console.log('📊 DataLayer contents:', window.dataLayer);
    
    // Push a test event
    window.dataLayer.push({
      'event': 'test_analytics_setup',
      'test_param': 'Analytics working correctly',
      'measurement_id': 'G-487BHE09VJ'
    });
    console.log('✅ Test event pushed to GTM dataLayer');
  } else {
    console.log('❌ GTM dataLayer not found');
  }
  
  // Check if GTM container is loaded
  if (window.google_tag_manager) {
    console.log('✅ Google Tag Manager container loaded');
  } else {
    console.log('❌ Google Tag Manager container not loaded');
  }
  
  // Check cookie consent status
  const consent = localStorage.getItem('cookieConsent');
  if (consent) {
    const preferences = JSON.parse(consent);
    console.log('🍪 Cookie consent status:', preferences);
  } else {
    console.log('🍪 No cookie consent found - analytics may be blocked');
  }
}

// Run test after page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(testAnalytics, 2000); // Wait 2 seconds for scripts to load
  });
} else {
  setTimeout(testAnalytics, 2000);
}