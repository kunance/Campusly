'use strict';

angular.module('myApp.nav', [])

    .controller('NavCtrl', ['$scope', '$location', function($scope, $location){
        $scope.isActive = function(loc){
            if($location.path().indexOf(loc) === 0){
                return "active";
            }
            return "";
        };
    }]);