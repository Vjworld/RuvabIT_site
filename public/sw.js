// Service worker for Ruvab IT website
// Handles caching, network errors, and timeouts

const CACHE_NAME = 'ruvab-it-v1';
const TIMEOUT = 8000; // 8 second timeout

// Only cache static assets, not API calls or external scripts
const urlsToCache = [
  '/',
  '/src/index.css',
];

self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  self.skipWaiting(); // Activate immediately
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching core files');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.warn('Service Worker: Could not cache files:', err);
      })
  );
});

self.addEventListener('fetch', event => {
  // Skip cross-origin requests, non-GET requests, and AdSense/analytics requests
  const url = new URL(event.request.url);
  if (
    !event.request.url.startsWith(self.location.origin) ||
    event.request.method !== 'GET' ||
    url.hostname.includes('googlesyndication.com') ||
    url.hostname.includes('googletagmanager.com') ||
    url.hostname.includes('google-analytics.com') ||
    url.hostname.includes('doubleclick.net') ||
    url.pathname.includes('/api/')
  ) {
    return;
  }

  event.respondWith(
    Promise.race([
      caches.match(event.request)
        .then(response => {
          if (response) {
            return response;
          }
          
          // Fetch with timeout
          return fetchWithTimeout(event.request, TIMEOUT);
        }),
      // Timeout fallback
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), TIMEOUT)
      )
    ])
    .catch(error => {
      console.warn('Service Worker: Network request failed:', error.message);
      
      // Return a basic offline response for HTML pages
      if (event.request.headers.get('accept').includes('text/html')) {
        return new Response(
          '<html><body><h1>Offline</h1><p>Please check your connection.</p></body></html>',
          { headers: { 'Content-Type': 'text/html' } }
        );
      }
      
      // For other resources, return network error
      return Response.error();
    })
  );
});

self.addEventListener('activate', event => {
  console.log('Service Worker: Activated');
  event.waitUntil(
    Promise.all([
      self.clients.claim(), // Take control immediately
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log('Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
    ])
  );
});

// Helper function to fetch with timeout
function fetchWithTimeout(request, timeout) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Request timeout after ${timeout}ms`));
    }, timeout);

    fetch(request)
      .then(response => {
        clearTimeout(timer);
        resolve(response);
      })
      .catch(error => {
        clearTimeout(timer);
        reject(error);
      });
  });
}