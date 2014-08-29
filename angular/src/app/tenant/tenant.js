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

    }
])

.controller('TenantsCtrl', ['$scope',
    function($scope) {
    }
])
