'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
        'templates-app',
        'templates-common',
        'myApp.config',
        'myApp.routes',
        'myApp.filters',
        'myApp.services',
        'myApp.directives',
        'myApp.controllers',
        'myApp.header',
        'myApp.user',
        'myApp.property',
        'module.simpleLoginTools',
        'module.routeSecurity',
        'ui.bootstrap',
        'ngSanitize',
        'angularytics'
    ])

    .config(['AngularyticsProvider',function(AngularyticsProvider) {
        AngularyticsProvider.setEventHandlers(['Console', 'GoogleUniversal']);
    }])

    .run(['loginService', '$rootScope', 'FBURL', 'syncData', 'Angularytics', function (loginService, $rootScope, FBURL, syncData, Angularytics) {

        if (FBURL === 'https://INSTANCE.firebaseio.com') {
            // double-check that the app has been configured
            angular.element(document.body).html('<h1>Please configure app/js/config.js before running!</h1>');
            setTimeout(function () {
                angular.element(document.body).removeClass('hide');
            }, 250);
        }
        else {
            // establish authentication
            $rootScope.auth = loginService.init('/login');
            $rootScope.FBURL = FBURL;
        }

        Angularytics.init();

//        $rootScope.$watch('auth.user', function(newValue, oldValue) {
//            if(newValue && newValue!=null) {
//                syncData(['users', $rootScope.auth.user.uid]).$bind($rootScope, 'user').then(function (unBind) {
//                    $rootScope.unBindUser = unBind;
//                    console.log($rootScope.user);
//                });
//            }
//            else{
//                if($rootScope.unBindUser){
//                    $rootScope.unBindUser();
//                    $rootScope.user = null;
//                }
//            }
//        });

//        $rootScope.$watch('user', function(newValue, oldValue) {
//            console.log(newValue);
//            if (!newValue || (newValue && newValue.phone && newValue.name)) {
//                TopBannerChannel.setBanner(null);
//            }
//            else{
//                console.log("setting banner");
//                TopBannerChannel.setBanner({
//                    content: $templateCache.get('user/partials/banner.tpl.html'),
//                    contentClass: "danger"
//                });
//            }
//        });



    }])
    .controller('AppCtrl', ['$scope', '$location', function ($scope, $location) {

    }]);