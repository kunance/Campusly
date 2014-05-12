'use strict';

angular.module('myApp.header', [])

    .controller('HeaderCtrl', ['$scope', '$location', function($scope, $location){
        $scope.isActive = function(loc){
            if($location.path().indexOf(loc) === 0){
                return "active";
            }
            return "";
        };
    }]);