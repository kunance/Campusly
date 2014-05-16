'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('HomeCtrl', ['$scope', 'propertyService', function ($scope, propertyService) {
        $scope.id = '-JMhPmCxD8WyGHZ0R0Ct';
        propertyService.fetch($scope.id).$bind($scope, 'property');
    }])

    .controller('StaticCtrl', ['$scope', function ($scope) {

    }]);