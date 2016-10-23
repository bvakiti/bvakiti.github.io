var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "js/views/searchpage.html"
        })
        .when("/getdetails", {
            templateUrl : "js/views/listpage.html"
        })
});

myApp.service('FlightDetailsService', function () {
        this.setData = function (details) {
            this.data = details;
        };
        this.getData = function () {
            return this.data;
        };
});

/***  Service Workers ***/

if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/bvakiti.github.io/serviceworker.js')
        .then(function() { console.log("Service Worker Registered"); }).catch(function (err) {
            console.log('err  ' + err);
        });
}
