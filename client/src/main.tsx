import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Handle WebSocket errors from Vite HMR in development
if (import.meta.env.DEV) {
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
  
  // Override WebSocket constructor to prevent errors
  const OriginalWebSocket = window.WebSocket;
  window.WebSocket = class extends OriginalWebSocket {
    constructor(url: string | URL, protocols?: string | string[]) {
      try {
        // Check if URL contains undefined port
        const urlString = url.toString();
        if (urlString.includes('localhost:undefined')) {
          // Create a dummy WebSocket that doesn't actually connect
          const dummy = Object.create(OriginalWebSocket.prototype);
          dummy.readyState = WebSocket.CONNECTING;
          dummy.close = () => {};
          dummy.send = () => {};
          dummy.addEventListener = () => {};
          dummy.removeEventListener = () => {};
          return dummy;
        }
        super(url, protocols);
      } catch (error) {
        // Return a dummy WebSocket on construction errors
        const dummy = Object.create(OriginalWebSocket.prototype);
        dummy.readyState = WebSocket.CLOSED;
        dummy.close = () => {};
        dummy.send = () => {};
        dummy.addEventListener = () => {};
        dummy.removeEventListener = () => {};
        return dummy;
      }
    }
  };
}

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
