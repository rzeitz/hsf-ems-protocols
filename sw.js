// HSF EMS Protocols — Service Worker
// Caches the entire app for offline use in the field

const CACHE_NAME = 'hsf-ems-v6';
const ASSETS = [
  './HSF_EMS_Protocols.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './hsf-logo.png'
];

// Install: cache all assets immediately
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: delete old caches from previous versions
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: serve from cache first, fall back to network
// For this app all content is self-contained so cache-first is ideal
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        if (cached) return cached;
        // Not in cache — try network and cache the response
        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200 || response.type === 'opaque') {
              return response;
            }
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseClone);
            });
            return response;
          })
          .catch(() => {
            // Network failed and not in cache — return offline fallback if HTML
            if (event.request.destination === 'document') {
              return caches.match('./HSF_EMS_Protocols.html');
            }
          });
      })
  );
});
