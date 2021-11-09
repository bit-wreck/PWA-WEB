//register service worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(function() {
          console.log("Pendaftaran ServiceWorker berhasil");
        })
        .catch(function() {
          console.log("Pendaftaran ServiceWorker gagal");
        });
    });
};
//Simpan ke cache
const CACHE_NAME = "Warlord";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/tentang.html",
  "/pages/kontak.html",
  "/pages/teams.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/script.js",
  "/img/Andika.jpg",
  "/img/Yaspin.jpg",
  "/img/fitoy2.png",
  "/img/devan.jpg",
  "/img/Ardi.png",
  "/img/Csgo.jpg",
  "/img/mobile.jpg",
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});
//Make cache aset
self.addEventListener("fetch", function(event) {
    event.respondWith(
      caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
          if (response) {
            console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
            return response;
          }
   
          console.log(
            "ServiceWorker: Memuat aset dari server: ",
            event.request.url
          );
          return fetch(event.request);
        })
    );
  });
  