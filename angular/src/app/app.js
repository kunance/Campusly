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
        'myApp.tenant',
        'myApp.owner',
        'module.simpleLoginTools',
        'module.routeSecurity',
        'ui.bootstrap',
        'ngSanitize',
        'angularytics',
        'angularFileUpload',
 //       'famous.angular',
        'uuid4'
    ])

    .config
    ([
        '$compileProvider',
        function( $compileProvider )
        {   
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|data):/);
        }
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


          $rootScope.$on('$routeChangeStart', function(next, current) { 
                $rootScope.secondaryNav= false;
          });

    }])
    .controller('AppCtrl', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {

        $rootScope.isActive = function(loc,strict){
            var path= $location.path();

            if(path.indexOf(loc) === 0){
               if (strict)
                return loc.length==path.length ? "active" : "";
               else
                return "active";
            }
            return "";
        };

    }])

    .filter('nvl', function()
    {
        return function(value, replacer) {
          return value ? value : (replacer ? replacer : '--');
        };
    })

    .directive('plHolder', function() {
      Holder.invisibleErrorFn= function () { return function () { console.log('ignore placeholder'); } };
      return {
          link: function(scope, element, attrs) {
              _.delay(function ()
              {
                attrs.$set('data-src', attrs.plHolder);
                      Holder.run({images:element[0]});
              },300);
          }
      };
    })

    .directive('goBack', ['$window',function($window) {
      return {
          link: function(scope, element, attrs) {
               element.on('click', function() {
                   $window.history.back();
               });
          }
      };
    }])

    .filter('rentCurrency',
      [ '$filter', '$locale',
      function(filter, locale) {
        var currencyFilter = filter('currency');
        var formats = locale.NUMBER_FORMATS;
        return function(amount, currencySymbol) {
          var value = currencyFilter(amount, currencySymbol);
          var sep = value.indexOf(formats.DECIMAL_SEP);
          if(amount >= 0) { 
            return value.substring(0, sep);
          }
          return value.substring(0, sep);
        };
      }]);
