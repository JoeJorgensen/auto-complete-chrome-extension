const CACHE_NAME = 'auto-complete-cache';

self.addEventListener('install', event => {
  // Skip the waiting lifecycle stage
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  // Claim the service worker so that it controls all pages
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  // Respond to requests for form submissions with the cached data
  if (event.request.method === 'POST' && event.request.headers.get('Content-Type') === 'application/x-www-form-urlencoded') {
    event.respondWith(
      caches.open(CACHE_NAME)
        .then(cache => cache.match(event.request, { ignoreSearch: true }))
        .then(response => {
          if (response) {
            return response;
          }
          return fetch(event.request);
        })
    );
  }
});

self.addEventListener('message', event => {
  // Save the form data in the cache when the background script sends a message
  if (event.data.type === 'save-form-data') {
    caches.open(CACHE_NAME)
      .then(cache => cache.put(event.data.request, event.data.response))
      .then(() => {
        // Send a message to the background script with the filled form data
        self.clients.matchAll()
          .then(clients => {
            clients.forEach(client => {
              client.postMessage({
                type: 'form-filled',
                formData: event.data.formData
              });
            });
          });
      });
  }
});
