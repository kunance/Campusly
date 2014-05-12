'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
        'templates-app',
        'templates-common',
        'myApp.config',
        'myApp.routes',
        'myApp.filters',
        'myApp.services',
        'myApp.directives',
        'myApp.controllers',
        'myApp.nav',
        'myApp.user',
        'myApp.property',
        'module.simpleLoginTools',
        'module.routeSecurity',
        'ui.bootstrap',
        'ngSanitize'
    ])

    .run(['loginService', '$rootScope', 'FBURL', function (loginService, $rootScope, FBURL) {
        if (FBURL === 'https://INSTANCE.firebaseio.com') {
            // double-check that the app has been configured
            angular.element(document.body).html('<h1>Please configure app/js/config.js before running!</h1>');
            setTimeout(function () {
                angular.element(document.body).removeClass('hide');
            }, 250);
        }
        else {
            // establish authentication
            $rootScope.auth = loginService.init('/login');
            $rootScope.FBURL = FBURL;
        }
    }])

    .controller('AppCtrl', ['$scope', '$location', function ($scope, $location) {

    }]);
