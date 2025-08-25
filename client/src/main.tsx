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
  
  // Comprehensive WebSocket override to prevent all construction errors
  const OriginalWebSocket = window.WebSocket;
  window.WebSocket = function(url: string | URL, protocols?: string | string[]) {
    try {
      // Check if URL contains undefined port or is malformed
      const urlString = url.toString();
      if (
        urlString.includes('localhost:undefined') ||
        urlString.includes(':undefined') ||
        !urlString.match(/^wss?:\/\//)
      ) {
        // Return a mock WebSocket that behaves like a real one but doesn't connect
        const mockSocket = {
          readyState: 0, // CONNECTING
          url: urlString,
          protocol: '',
          extensions: '',
          binaryType: 'blob' as BinaryType,
          bufferedAmount: 0,
          
          // Event handlers
          onopen: null,
          onclose: null,
          onmessage: null,
          onerror: null,
          
          // Methods
          close: (code?: number, reason?: string) => {
            mockSocket.readyState = 3; // CLOSED
            if (mockSocket.onclose) {
              mockSocket.onclose({ code: code || 1000, reason: reason || '', wasClean: true } as CloseEvent);
            }
          },
          send: (data: string | ArrayBufferLike | Blob | ArrayBufferView) => {
            // Do nothing, just prevent errors
          },
          addEventListener: (type: string, listener: any, options?: any) => {
            // Mock event listener
          },
          removeEventListener: (type: string, listener: any, options?: any) => {
            // Mock event listener removal
          },
          dispatchEvent: (event: Event) => false,
          
          // Constants
          CONNECTING: 0,
          OPEN: 1,
          CLOSING: 2,
          CLOSED: 3
        };
        
        // Simulate connection failure after a short delay
        setTimeout(() => {
          mockSocket.readyState = 3; // CLOSED
          if (mockSocket.onclose) {
            mockSocket.onclose({ code: 1006, reason: 'Connection failed', wasClean: false } as CloseEvent);
          }
        }, 100);
        
        return mockSocket as WebSocket;
      }
      
      // For valid URLs, try to create real WebSocket
      return new OriginalWebSocket(url, protocols);
    } catch (error) {
      // If anything fails, return a closed mock socket
      return {
        readyState: 3, // CLOSED
        url: url.toString(),
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
      } as WebSocket;
    }
  } as any;
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
