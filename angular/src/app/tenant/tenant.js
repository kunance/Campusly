'use strict';

/* Controllers */
angular.module('myApp.tenant', ['ngRoute'])

// configure views; the authRequired parameter is used for specifying pages
// which should only be available while logged in
.config(['$routeProvider',
    function($routeProvider) {

        $routeProvider.when('/tenants', {
            templateUrl: 'tenant/tenants.tpl.html',
            loggedInRedirect: '/tenants/on-boarding'
        });

        $routeProvider.when('/tenants/on-boarding', {
            authRequired: true,
            templateUrl: 'tenant/on-boarding.tpl.html',
            controller: 'OnBoardingCtrl',
        });
    }
])

.controller('OnBoardingCtrl', ['$scope','$rootScope','$location',
    function($scope,$rootScope,$location) {
       $rootScope.secondaryNav= 'tenant/partials/menu-tenant.tpl.html';
    }
])
