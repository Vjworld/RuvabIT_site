import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Handle WebSocket errors from Vite HMR in development
if (import.meta.env.DEV) {
  // Early WebSocket override - must happen before any other scripts
  const OriginalWebSocket = window.WebSocket;
  
  // Override at the very beginning before anything can use WebSocket
  Object.defineProperty(window, 'WebSocket', {
    value: function(url: string | URL, protocols?: string | string[]) {
      const urlString = url.toString();
      
      // Prevent any WebSocket construction with undefined port
      if (urlString.includes('localhost:undefined') || urlString.includes(':undefined')) {
        // Return a completely inert mock WebSocket
        const mockSocket = {
          readyState: 3, // CLOSED
          url: urlString,
          protocol: '',
          extensions: '',
          binaryType: 'blob' as BinaryType,
          bufferedAmount: 0,
          onopen: null,
          onclose: null,
          onmessage: null,
          onerror: null,
          close: () => {},
          send: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => false,
          CONNECTING: 0,
          OPEN: 1,
          CLOSING: 2,
          CLOSED: 3
        };
        return mockSocket as WebSocket;
      }
      
      // For valid URLs, create real WebSocket
      return new OriginalWebSocket(url, protocols);
    },
    writable: true,
    configurable: true
  });

  // Comprehensive error suppression for development
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;
  
  console.error = (...args) => {
    const errorString = args.join(' ');
    if (
      errorString.includes('WebSocket') ||
      errorString.includes('localhost:undefined') ||
      errorString.includes('Failed to construct') ||
      errorString.includes('DOMException')
    ) {
      return; // Suppress these HMR errors
    }
    originalConsoleError.apply(console, args);
  };
  
  console.warn = (...args) => {
    const warnString = args.join(' ');
    if (
      warnString.includes('WebSocket') ||
      warnString.includes('localhost:undefined')
    ) {
      return; // Suppress these HMR warnings
    }
    originalConsoleWarn.apply(console, args);
  };
  
}

// Global error handlers to prevent unhandled rejections
window.addEventListener('unhandledrejection', (event) => {
  console.warn('Unhandled promise rejection caught:', event.reason);
  
  // Check if it's a non-critical error that can be safely ignored
  const reason = event.reason?.toString() || '';
  if (
    reason.includes('WebSocket') ||
    reason.includes('analytics') ||
    reason.includes('gtag') ||
    reason.includes('google') ||
    reason.includes('Failed to fetch')
  ) {
    // Prevent these non-critical errors from showing in console
    event.preventDefault();
    return;
  }
  
  // Allow other errors to be logged normally
});

window.addEventListener('error', (event) => {
  console.warn('Global error caught:', event.error);
  
  // Check if it's a non-critical error
  const errorMsg = event.error?.message || event.message || '';
  if (
    errorMsg.includes('WebSocket') ||
    errorMsg.includes('analytics') ||
    errorMsg.includes('gtag') ||
    errorMsg.includes('google')
  ) {
    // Prevent these non-critical errors from causing issues
    event.preventDefault();
    return;
  }
});

// Service Worker registration for monetization
// Only register in production, not in development
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registered successfully');
        console.log('Cache and error handling active');
      })
      .catch(error => {
        console.warn('Service Worker registration failed:', error.message);
        // Don't crash the app if service worker fails
      });
  });
}

createRoot(document.getElementById("root")!).render(<App />);
