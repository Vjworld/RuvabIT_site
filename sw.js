// Service Worker for Ruvab IT - Advanced Technology Solutions
// Provides offline support, error handling, and performance optimizations

const CACHE_NAME = 'ruvab-it-v1';
const STATIC_CACHE_NAME = 'ruvab-it-static-v1';
const DYNAMIC_CACHE_NAME = 'ruvab-it-dynamic-v1';

// Resources to cache on service worker installation
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  // Core CSS and JS files will be cached dynamically
];

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS.filter(url => url !== '/offline.html'));
      })
      .then(() => {
        console.log('Service Worker: Installation complete');
        return self.skipWaiting();
      })
      .catch(error => {
        console.warn('Service Worker: Installation failed', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
              console.log('Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activation complete');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Handle API requests differently
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Cache successful API responses for news and blog posts
          if (response.ok && (url.pathname.includes('/blog/') || url.pathname.includes('/news'))) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE_NAME)
              .then(cache => cache.put(request, responseClone))
              .catch(error => console.warn('Service Worker: Failed to cache API response', error));
          }
          return response;
        })
        .catch(error => {
          console.warn('Service Worker: API request failed, checking cache', error);
          // Return cached version if available
          return caches.match(request);
        })
    );
    return;
  }

  // Handle static assets and pages
  event.respondWith(
    caches.match(request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request)
          .then(response => {
            // Don't cache if response is not ok
            if (!response.ok) {
              return response;
            }

            // Cache successful responses
            const responseClone = response.clone();
            const cacheKey = url.pathname.endsWith('/') ? STATIC_CACHE_NAME : DYNAMIC_CACHE_NAME;
            
            caches.open(cacheKey)
              .then(cache => cache.put(request, responseClone))
              .catch(error => console.warn('Service Worker: Failed to cache response', error));

            return response;
          })
          .catch(error => {
            console.warn('Service Worker: Fetch failed, serving offline page', error);
            
            // Return offline page for navigation requests
            if (request.mode === 'navigate') {
              return caches.match('/offline.html') || new Response(
                '<html><body><h1>Offline</h1><p>You are currently offline. Please check your connection.</p></body></html>',
                { headers: { 'Content-Type': 'text/html' } }
              );
            }
            
            // For other requests, return a generic offline response
            return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
          });
      })
  );
});

// Handle background sync (for future implementation)
self.addEventListener('sync', event => {
  console.log('Service Worker: Background sync triggered');
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle background synchronization
      console.log('Service Worker: Handling background sync')
    );
  }
});

// Handle push notifications (for future implementation)
self.addEventListener('push', event => {
  console.log('Service Worker: Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'New update available',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    actions: [
      {
        action: 'view',
        title: 'View'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Ruvab IT', options)
  );
});

// Error handling
self.addEventListener('error', event => {
  console.error('Service Worker: Error occurred', event.error);
});

self.addEventListener('unhandledrejection', event => {
  console.error('Service Worker: Unhandled promise rejection', event.reason);
  event.preventDefault();
});

// Message handling for communication with main thread
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('Service Worker: Script loaded successfully');