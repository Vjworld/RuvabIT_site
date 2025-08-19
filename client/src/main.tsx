import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Service Worker registration for monetization
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
        console.log('Monetization service worker active for ruvab.it.com');
      })
      .catch(error => {
        console.log('Service Worker registration failed:', error);
      });
  });
}

createRoot(document.getElementById("root")!).render(<App />);
