'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('HomeCtrl', ['$scope', 'firebaseRef', 'propertyService', function ($scope, firebaseRef, propertyService) {
        firebaseRef('featured').once('value', function(featured){
	        $scope.id = featured.val();
	        $scope.getStatus = propertyService.getStatus;
	        $scope.property = {};
	        var propertiesRef = firebaseRef('properties', $scope.id);
	        propertiesRef.once('value', function(property){
	            $scope.property = property.val();
	            propertyService.isActive($scope.property);
	            $scope.$apply();                       
	        });
        });
    }])

    .controller('StaticCtrl', ['$scope', function ($scope) {

    }]);