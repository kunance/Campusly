'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('HomeCtrl', ['$scope', 'syncData', function ($scope, syncData) {
        syncData('syncedValue').$bind($scope, 'syncedValue');
    }])