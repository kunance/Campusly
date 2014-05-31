'use strict';

angular.module('myApp.header', [])

    .controller('HeaderCtrl', ['$scope', '$location', '$timeout', 'TopBannerChannel', function($scope, $location, $timeout, TopBannerChannel){

        $scope.isActive = function(loc){
            if($location.path().indexOf(loc) === 0){
                return "active";
            }
            return "";
        };

        $scope.banner = null;

        var setBanner = function(data){
            $scope.banner = data;
        };

        TopBannerChannel.onSetBanner($scope, setBanner);

    }]);