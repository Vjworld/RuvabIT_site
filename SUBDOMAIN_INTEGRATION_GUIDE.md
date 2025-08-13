# GoToTopButton Integration Guide for Subdomains

## Overview
This guide explains how to add the enhanced GoToTopButton to all Ruvab IT subdomains (langscribe.ruvab.it.com, trendsolver.ruvab.it.com, qr-gen.ruvab.it.com).

## Integration Methods

### Method 1: Direct Script Include (Recommended)
Add this script tag to the `<head>` or before closing `</body>` tag of each subdomain:

```html
<script src="https://ruvab.it.com/go-to-top-button.js"></script>
```

### Method 2: Copy Script Directly
Copy the contents of `public/go-to-top-button.js` and include it directly in each subdomain's HTML or JavaScript bundle.

### Method 3: CDN Distribution
Host the script on a CDN and reference it from all subdomains for better performance.

## Features Included

✅ **Enhanced Visibility**
- Blue-to-purple gradient background that stands out on any color scheme
- White border and drop shadow for visibility on light/dark backgrounds
- Glowing effect on hover to ensure visibility

✅ **Modern Animations**
- Subtle bounce animation to draw attention
- Glow pulse effect on hover
- Smooth scale transform on interaction

✅ **Smart Positioning**
- Fixed position at bottom-left (24px from edges)
- Z-index 40 to avoid conflicts with most website elements
- Responsive sizing for mobile devices

✅ **Performance Optimized**
- Throttled scroll handler using requestAnimationFrame
- CSS animations with GPU acceleration
- Lightweight script (~3KB)

✅ **Accessibility**
- Proper ARIA labels and title attributes
- Keyboard accessible
- Screen reader friendly

## Implementation for Each Subdomain

### LangScribe (langscribe.ruvab.it.com)
Add the script to the main HTML template or React/Vue app entry point.

### TrendSolver (trendsolver.ruvab.it.com)
Include in the application's main JavaScript bundle or HTML template.

### QR Gen Tool (qr-gen.ruvab.it.com)
Add to the main page template or Progressive Web App shell.

## Customization Options

The script can be customized by modifying the CSS variables:

```css
.go-to-top-btn {
  /* Position */
  bottom: 24px;
  left: 24px;
  
  /* Size */
  width: 56px;
  height: 56px;
  
  /* Colors */
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  
  /* Show threshold */
  /* Modify the JavaScript: window.pageYOffset > 300 */
}
```

## Testing

After implementation, test on each subdomain:

1. ✅ Button appears after scrolling down 300px
2. ✅ Button is visible on all background colors
3. ✅ Smooth scroll animation works correctly
4. ✅ Hover effects function properly
5. ✅ Mobile responsiveness works
6. ✅ No conflicts with existing UI elements

## Deployment Status

- [x] Main website (ruvab.it.com) - ✅ COMPLETED
- [ ] LangScribe subdomain - 🔄 PENDING
- [ ] TrendSolver subdomain - 🔄 PENDING  
- [ ] QR Gen Tool subdomain - 🔄 PENDING

## Next Steps

1. Deploy the `go-to-top-button.js` script to the main website's public folder
2. Add script references to each subdomain's HTML template
3. Test functionality across all subdomains
4. Verify no conflicts with existing chat widgets or UI elements

## Support

For any issues with implementation, contact the development team or refer to this documentation.