const CACHE_NAME = 'choir-app-v1';
const ASSETS_TO_CACHE = [
  './index.htm',
  './MuXml.htm',
  // Add other essential assets here (e.g., icons or local CSS)
];

// 1. Install Event: Save files to the cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Fetch Event: Serve files from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached file if found, otherwise fetch from network
      return response || fetch(event.request);
    })
  );
});

// 3. Activate Event: Clean up old caches if you update version
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});