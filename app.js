var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "js/views/searchpage.html"
        })
        .when("/getdetails", {
            templateUrl : "js/views/listpage.html"
        })
}]);

myApp.service('FlightDetailsService', function ($http, $q) {


    this.getData = function () {
        var deferred = $q.defer();

        $http.get('https://bandhavya.github.io/sampleFlightData.json')
            .success(function (data) {
                console.log('succ data');
                deferred.resolve(data);
            }).error(function (data, status, header, config) {
                alert('error in getting data');
                deferred.reject();
            });
        return deferred.promise;
    };
});

/***  Service Workers ***/

if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceworker.js')
        .then(function() {
            console.log("Service Worker Registered");
            initialiseState();
        }).catch(function (err) {
            window.Demo.debug.log('Service workers aren\'t supported in this browser.');
            console.log('err  ' + err);
        });
}

function initialiseState() {
    // Are Notifications supported in the service worker?
    if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
        window.Demo.debug.log('Notifications aren\'t supported.');
        return;
    }

    //if (Notification.permission !== 'granted') {
    //    console.log('The user has not granted the notification permission.');
    //    return;
    //} else if (Notification.permission === 'blocked') {
    //    /* the user has previously denied push. Can't reprompt. */
    //} else {
    //    /* show a prompt to the user */
    //}

    // Check if push messaging is supported
    if (!('PushManager' in window)) {
        window.Demo.debug.log('Push messaging isn\'t supported.');
        return;
    }

    // Use serviceWorker.ready so this is only invoked
    // when the service worker is available.
    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
        return serviceWorkerRegistration.pushManager.subscribe({
            'userVisibleOnly': true
    }).then(function(subscription) {
            if (!subscription) {
                // Set appropriate app states.
                return;
            }
            console.log(subscription.endpoint);
            //var fetchOptions = {
            //    method: 'post',
            //    headers: new Headers({
            //        'Content-Type': 'application/json'
            //    }),
            //    body: JSON.stringify(subscription)
            //};
            //return fetch('/your-web-server/api', fetchOptions);
        }).catch(function (err) {
            console.log('error in subcription .. '+ err);
        });
        //serviceWorkerRegistration.pushManager.getSubscription()

    })
}
