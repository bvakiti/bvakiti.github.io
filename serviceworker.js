/**
 * Created by bandhavyav on 22/10/16.
 */

// Use a cacheName for cache versioning
    var cacheName = 'v1:static';

// During the installation phase, you'll usually want to cache static assets.
self.addEventListener('install', function(e) {
    // Once the service worker is installed, go ahead and fetch the resources to make this work offline.
    //e.waitUntil(
    //    caches.open(cacheName).then(function(cache) {
    //        return cache.addAll([
    //            '/bvakiti.github.io/',
    //            '/bvakiti.github.io/index.html',
    //            '/bvakiti.github.io/app.js',
    //            '/bvakiti.github.io/bkg.jpg'
    //        ]).then(function() {
    //            self.skipWaiting();
    //        });
    //    })
    //);
});

//when the browser fetches a URL…
    self.addEventListener('fetch', function (event) {
        console.log('Handling fetch event for', event.request.url);

        event.respondWith(
            caches.match(event.request).then(function (response) {
                if (event.request.url === 'http://i.ytimg.com/vi/F3I0wRGAkxo/maxresdefault.jpg') {
                    return;
                }
                if (response) {
                    console.log('found response in cache: ' + response);
                    return response;
                }

                //no response found in cache. so fetch from n/w.

                return fetch(event.request).then(function(response) {
                    console.log('response from n/w ' + response);

                    caches.open(cacheName).then(function(cache) {
                       cache.put(event.request, response);
                    });

                    return response;
                }).catch(function (err) {

                    console.log('fetching failed ' + err);
                    throw err;
                });

            })

        );

    });

console.log('Started', self);

self.addEventListener('install', function(event) {
    self.skipWaiting();
    console.log('Installed', event);
});

self.addEventListener('activate', function(event) {
    console.log('Activated', event);
});

self.addEventListener('push', function(event) {
    console.log('Push message', event);

    var title = 'Push message';
    console.log('into push');
    event.waitUntil(
        self.registration.showNotification(title, {
            body: 'You received a new Message',
            icon: 'launch.jpg',
            tag: 'my-tag'
        }));
});