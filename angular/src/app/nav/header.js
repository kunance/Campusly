'use strict';

angular.module('myApp.header', [])

    .controller('HeaderCtrl', ['$scope', '$location', '$timeout', 'TopBannerChannel', function($scope, $location, $timeout, TopBannerChannel){

        $scope.banner = null;

        var setBanner = function(data){
            $scope.banner = data;
        };

        TopBannerChannel.onSetBanner($scope, setBanner);

    }]);
