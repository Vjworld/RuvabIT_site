import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Handle WebSocket errors from Vite HMR in development
if (import.meta.env.DEV) {
  // Suppress WebSocket connection errors that don't affect functionality
  const originalConsoleError = console.error;
  console.error = (...args) => {
    const errorString = args.join(' ');
    if (errorString.includes('WebSocket') && errorString.includes('localhost:undefined')) {
      // Suppress these specific HMR connection errors in dev
      return;
    }
    originalConsoleError.apply(console, args);
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
