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

    }
])

.controller('OwnersCtrl', ['$scope',
    function($scope) {
    }
])
