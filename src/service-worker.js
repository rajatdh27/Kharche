/* eslint-disable no-restricted-globals */
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";
import { CacheFirst } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";
import { CacheableResponsePlugin } from "workbox-cacheable-response";

// This should point to your precache manifest file.
precacheAndRoute(self.__WB_MANIFEST);

// Here is an example of how to add a route to Workbox
// to cache a specific API call and refresh it every 30 seconds.
registerRoute(
  /\/api\/my-api/,
  new StaleWhileRevalidate({
    cacheName: "my-api-cache",
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 30,
      }),
      new CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  })
);

// Here is an example of how to add a route to Workbox
// to cache a specific file (such as a logo) with a
// CacheFirst strategy.
registerRoute(
  /\/logo.png/,
  new CacheFirst({
    cacheName: "logo-cache",
  })
);
const CACHE_NAME = "kharche-cache";
const urlsToCache = ["/", "/index.html"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
