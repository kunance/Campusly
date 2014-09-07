'use strict';

angular.module('myApp.header', [])

    .controller('HeaderCtrl', ['$rootScope', '$location', '$timeout', 'TopBannerChannel', function($rootScope, $location, $timeout, TopBannerChannel){

        $rootScope.banner = {};

        var clearBanner = _.debounce(function ()
            {
               $rootScope.banner.content = null;
            },5000),
            setBanner = function(data) {

                if (data.type)
                  data.contentClass= data.type;

                _.extend($rootScope.banner,data);
                window.scroll(0,0);
                clearBanner(); 
            };

        TopBannerChannel.onSetBanner($rootScope, setBanner);

        // toggle navbar on click
        $(document).on('click.nav','.navbar-collapse.in',function(e) {
            if( $(e.target).is('a') || $(e.target).is('button')) {
                $(this).collapse('hide');
            }
        });

    }]);
