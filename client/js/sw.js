const openCache = caches.open('#[viper-news]');
const any = $ => new Promise((D, E, A, L) => {
  A = [];
  L = $.map(($, i) => Promise
      .resolve($)
      .then(D, O => (((A[i] = O), --L) || E(A)))
  ).length;
});

self.addEventListener('install', e => {
  e.waitUntil(
    openCache.then(cache => cache.addAll([
      '/',
      '/css/bundle.css',
      '/js/bundle.js'
    ]))
  );
});

self.addEventListener('fetch', e => {
  const request = e.request;
  e.respondWith(
    openCache.then(cache => cache.match(request).then(
      response => {
        const remote = fetch(request).then(
          response => {
              cache.put(request, response.clone());
              return response;
          }
        );
        return any([response || remote, remote]);
      }
    ))
  );
});