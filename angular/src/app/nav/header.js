'use strict';

angular.module('myApp.header', [])

    .controller('HeaderCtrl', ['$scope', '$location', '$timeout', 'TopBannerChannel', function($scope, $location, $timeout, TopBannerChannel){

        $scope.banner = null;

        var clearBanner = _.debounce(function ()
            {
               $scope.banner = null;
            },5000),
            setBanner = function(data) {
                $scope.banner = data;
                window.scroll(0,0);
                clearBanner(); 
            };

        TopBannerChannel.onSetBanner($scope, setBanner);

        // toggle navbar on click
        $(document).on('click.nav','.navbar-collapse.in',function(e) {
            if( $(e.target).is('a') || $(e.target).is('button')) {
                $(this).collapse('hide');
            }
        });

    }]);
