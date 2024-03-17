const prioriCache = 'prioritask-cache-v2';

const urlsToCache = [
  '/startPage.html',
  '/createUser.html',
  '/loginUser.html',
  '/userSettings.html',
  '/style.css',
  '/service-worker.mjs',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(prioriCache)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") {
    event.respondWith(fetch(request));
    return;
  }

  event.respondWith(
    caches.open(prioriCache).then((cache) => {
      return cache.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request).then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== "basic") {
            return networkResponse;
          }

          cache.put(request, networkResponse.clone());
          return networkResponse;
        });

        if (request.method === "PUT" || request.method === "POST" || request.method === "DELETE") {
          return fetchPromise.then(() => {
            
                const deleteOldCaches = async () => {
                  const cacheKeepList = prioriCache;
                  const keyList = await caches.keys();
                  const cachesToDelete = keyList.filter((key) => !cacheKeepList.includes(key));
                  await Promise.all(cachesToDelete.map(deleteCache));
                };

                self.addEventListener("activate", (event) => {
                  event.waitUntil(deleteOldCaches());
                });
              })


            
        } return cachedResponse || fetchPromise;

      });
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => cacheName !== prioriCache)
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
});