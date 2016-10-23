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
    //            //'/ProgressiveWebApp-Service/',
    //            //'/ProgressiveWebApp-Service/index.html',
    //            //'/ProgressiveWebApp-Service/app.js'
    //        ]).then(function() {
    //            self.skipWaiting();
    //        });
    //    })
    //);
});

//when the browser fetches a URL…
    this.addEventListener('fetch', function (event) {
        console.log('Handling fetch event for', event.request.url);

        event.respondWith(
            caches.match(event.request).then(function (response) {
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