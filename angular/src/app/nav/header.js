'use strict';

angular.module('myApp.header', [])

    .controller('HeaderCtrl', ['$scope', '$location', 'TopBannerChannel', function($scope, $location, TopBannerChannel){

        $scope.isActive = function(loc){
            if($location.path().indexOf(loc) === 0){
                return "active";
            }
            return "";
        };

        var setBanner = function(data){
            // note that the handler is passed the problem domain parameters
            $scope.banner = data;
        };

        TopBannerChannel.onSetBanner($scope, setBanner);

    }]);