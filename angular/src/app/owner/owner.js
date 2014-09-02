'use strict';

/* Controllers */
angular.module('myApp.owner', ['ngRoute'])

// configure views; the authRequired parameter is used for specifying pages
// which should only be available while logged in
.config(['$routeProvider',
    function($routeProvider) {

        $routeProvider.when('/owners', {
            templateUrl: 'owner/owners.tpl.html',
            loggedInRedirect: '/owners/add-property'
        });

        $routeProvider.when('/owners/add-property', {
            authRequired: true,
            templateUrl: 'owner/add-property.tpl.html',
            controller: 'AddPropertyCtrl'
        });
    }
])

.controller('AddPropertyCtrl', ['$scope','$rootScope','$location',
    function($scope,$rootScope,$location) {
       $rootScope.secondaryNav= 'owner/partials/menu-owner.tpl.html';
    }
])
