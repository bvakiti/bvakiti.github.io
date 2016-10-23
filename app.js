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
        .then(function() { console.log("Service Worker Registered"); }).catch(function (err) {
            console.log('err  ' + err);
        });
}
