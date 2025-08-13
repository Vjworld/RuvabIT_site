/**
 * Standalone Go To Top Button Script
 * Can be included in any website to add a beautiful, visible Go To Top button
 * Usage: Add this script to any HTML page and it will automatically work
 */

(function() {
  'use strict';
  
  // Avoid multiple initializations
  if (window.goToTopButtonInitialized) {
    return;
  }
  window.goToTopButtonInitialized = true;

  // Create and inject CSS styles
  const styles = `
    .go-to-top-btn {
      position: fixed;
      bottom: 24px;
      left: 24px;
      z-index: 40;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
      border: 2px solid rgba(255, 255, 255, 0.3);
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      box-shadow: 0 8px 32px rgba(59, 130, 246, 0.4), 0 4px 16px rgba(139, 92, 246, 0.3);
      backdrop-filter: blur(8px);
      opacity: 0;
      transform: translateY(16px);
      pointer-events: none;
      animation: subtle-bounce 3s ease-in-out infinite;
    }
    
    .go-to-top-btn.visible {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }
    
    .go-to-top-btn:hover {
      transform: scale(1.1);
      box-shadow: 0 12px 40px rgba(59, 130, 246, 0.6), 0 6px 20px rgba(139, 92, 246, 0.5);
      animation: glow-pulse 1.5s ease-in-out infinite;
    }
    
    .go-to-top-btn svg {
      width: 24px;
      height: 24px;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
      transition: transform 0.2s ease;
    }
    
    .go-to-top-btn:hover svg {
      transform: scale(1.1);
    }
    
    .go-to-top-btn::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(139, 92, 246, 0.3) 100%);
      opacity: 0.2;
      filter: blur(4px);
      transition: opacity 0.3s ease;
    }
    
    .go-to-top-btn:hover::before {
      opacity: 0.4;
    }
    
    @keyframes subtle-bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-4px);
      }
      60% {
        transform: translateY(-2px);
      }
    }
    
    @keyframes glow-pulse {
      0%, 100% {
        box-shadow: 0 8px 32px rgba(59, 130, 246, 0.4), 0 4px 16px rgba(139, 92, 246, 0.3);
      }
      50% {
        box-shadow: 0 12px 40px rgba(59, 130, 246, 0.6), 0 6px 20px rgba(139, 92, 246, 0.5);
      }
    }
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
      .go-to-top-btn {
        width: 48px;
        height: 48px;
        bottom: 20px;
        left: 20px;
      }
      
      .go-to-top-btn svg {
        width: 20px;
        height: 20px;
      }
    }
  `;

  // Inject styles into the page
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);

  // Create the button element
  const button = document.createElement('button');
  button.className = 'go-to-top-btn';
  button.setAttribute('aria-label', 'Go to top');
  button.setAttribute('title', 'Go to top');
  button.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: block;">
      <polyline points="18,15 12,9 6,15"></polyline>
    </svg>
  `;

  // Add click functionality
  button.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Show/hide button based on scroll position
  let isVisible = false;
  
  function toggleVisibility() {
    const shouldShow = window.pageYOffset > 300;
    
    if (shouldShow !== isVisible) {
      isVisible = shouldShow;
      button.classList.toggle('visible', shouldShow);
    }
  }

  // Throttled scroll handler for better performance
  let ticking = false;
  
  function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(function() {
        toggleVisibility();
        ticking = false;
      });
      ticking = true;
    }
  }

  // Initialize when DOM is ready
  function init() {
    // Add button to page
    document.body.appendChild(button);
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    toggleVisibility();
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();