"use strict";

angular.module('myApp.routes', ['ngRoute'])

    // configure views; the authRequired parameter is used for specifying pages
    // which should only be available while logged in
    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/home', {
            templateUrl: 'partials/home.tpl.html',
            controller: 'HomeCtrl'
        });

        $routeProvider.when('/terms', {
            templateUrl: 'partials/terms.tpl.html',
            controller: 'StaticCtrl'
        });

        $routeProvider.when('/privacy-policy', {
            templateUrl: 'partials/privacy.tpl.html',
            controller: 'StaticCtrl'
        });

        $routeProvider.otherwise({redirectTo: '/home'});
    }]);