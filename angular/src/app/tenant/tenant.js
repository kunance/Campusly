'use strict';

/* Controllers */
angular.module('myApp.tenant', ['ngRoute'])

// configure views; the authRequired parameter is used for specifying pages
// which should only be available while logged in
.config(['$routeProvider',
    function($routeProvider) {

        $routeProvider.when('/tenants', {
            templateUrl: 'tenant/tenants.tpl.html',
            controller: 'TenantsCtrl'
        });

        $routeProvider.when('/tenants/on-boarding', {
            templateUrl: 'tenant/on-boarding.tpl.html',
            controller: 'OnBoardingCtrl'
        });
    }
])

.controller('TenantsCtrl', ['loggedIn','$location',
    function(loggedIn,$location) {
       loggedIn(function ()
       {
          $location.path('/tenants/on-boarding');
       });
    }
])

.controller('OnBoardingCtrl', ['$scope','$rootScope','$location',
    function($scope,$rootScope,$location) {
       $rootScope.secondaryNav= 'tenant/partials/menu-tenant.tpl.html';
    }
])
