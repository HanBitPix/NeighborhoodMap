/********************
  Source:
  https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
********************/

let CACHE_NAME = 'coffee-shop-v1';

// Deleting old caches
self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
      .then(keyList =>
        Promise.all(keyList.map(key => {
          if (!cacheWhitelist.includes(key)) {
            console.log('Deleting cache: ' + key)
            return caches.delete(key);
          }
        }))
      )
  );
});

// Install and activate: populating your cache
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        const urlsToCache = [
          "/",
          "./index.html",
          "./menu.png",
          "./static/js/bundle.js"
        ]
        cache.addAll(urlsToCache)
        console.log('cached');
      })
  );
});

// Adding all fetches to cache and the retreiving data from cache
self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(response => {
    if (response) {
      return response;
    }

    return fetch(event.request).then(response => {
      if (response.ok) {
        caches.open(CACHE_NAME).then(cache => {
          cache.add(event.request);
        });
      }
      return response;
    });
  }));
});