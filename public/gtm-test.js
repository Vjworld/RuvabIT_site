// Google Tag Manager Test Script
function testGTM() {
  console.log('Testing Google Tag Manager...');
  
  // Check if dataLayer exists
  if (typeof window.dataLayer !== 'undefined') {
    console.log('✅ GTM dataLayer is available');
    console.log('DataLayer contents:', window.dataLayer);
  } else {
    console.log('❌ GTM dataLayer not found');
  }
  
  // Check if GTM container is loaded
  if (window.google_tag_manager) {
    console.log('✅ Google Tag Manager container loaded');
  } else {
    console.log('❌ Google Tag Manager container not loaded');
  }
  
  // Push a test event
  if (typeof window.dataLayer !== 'undefined') {
    window.dataLayer.push({
      'event': 'gtm_test',
      'test_param': 'GTM is working'
    });
    console.log('✅ Test event pushed to dataLayer');
  }
}

// Run test after page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', testGTM);
} else {
  testGTM();
}