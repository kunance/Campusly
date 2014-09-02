'use strict';

/* Controllers */
angular.module('myApp.owner', ['ngRoute'])

// configure views; the authRequired parameter is used for specifying pages
// which should only be available while logged in
.config(['$routeProvider',
    function($routeProvider) {

        $routeProvider.when('/owners', {
            templateUrl: 'owner/owners.tpl.html',
            controller: 'OwnersCtrl'
        });

        $routeProvider.when('/owners/add-property', {
            templateUrl: 'owner/add-property.tpl.html',
            controller: 'AddPropertyCtrl'
        });
    }
])

.controller('OwnersCtrl', ['loggedIn','$location',
    function(loggedIn,$location) {
       loggedIn(function ()
       {
          $location.path('/owners/add-property');
       });
    }
])

.controller('AddPropertyCtrl', ['$scope','$rootScope','$location',
    function($scope,$rootScope,$location) {
       $rootScope.secondaryNav= 'owner/partials/menu-owner.tpl.html';
    }
])
