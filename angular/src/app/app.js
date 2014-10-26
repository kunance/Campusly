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
        'myApp.admin',
        'module.simpleLoginTools',
        'module.routeSecurity',
        'ui.bootstrap',
        'ngSanitize',
        'angularytics',
        'angularFileUpload',
 //       'famous.angular',
        'uuid4',
        'ui.utils.masks',
        'ui.mask',
        'youtube-embed',
        'angulartics',
        'angulartics.google.analytics'
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
          return value ? value : (replacer ? replacer : 'N/A');
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
      }])

      
     .directive('datepickerLocaldate', ['$parse', function ($parse) {
        var directive = {
            restrict: 'A',
            require: ['ngModel'],
            link: link
        };
        return directive;
 
        function link(scope, element, attr, ctrls) {
            var ngModelController = ctrls[0];
 
            // called with a JavaScript Date object when picked from the datepicker
            ngModelController.$parsers.push(function (viewValue) {

                if (!viewValue) return;

                // undo the timezone adjustment we did during the formatting
                viewValue.setMinutes(viewValue.getMinutes() - viewValue.getTimezoneOffset());
                // we just want a local date in ISO format
                return viewValue.toISOString().substring(0, 10);
            });
 
            // called with a 'yyyy-mm-dd' string to format
            ngModelController.$formatters.push(function (modelValue) {
                if (!modelValue) {
                    return undefined;
                }
                // date constructor will apply timezone deviations from UTC (i.e. if locale is behind UTC 'dt' will be one day behind)
                var dt = new Date(modelValue);
                // 'undo' the timezone offset again (so we end up on the original date again)
                dt.setMinutes(dt.getMinutes() + dt.getTimezoneOffset());
                return dt;
            });
        }
    }])

    .factory('compressImage',['IMAGE_COMPRESSION',function (IMAGE_COMPRESSION)
    {
          return function (type,dataURL,done)
          {
               var img = new Image;

               console.log('compressImage before',type,dataURL.length);

               img.onload= function ()
               {
                   if (_.contains(['image/png','image/jpeg','image/jpg'],type))
                     dataURL= jic.compress(img,IMAGE_COMPRESSION,type.indexOf('image/png')==0 ? 'png' : 'jpg').src;

                   console.log('compressImage after',type,dataURL.length);
                   done(dataURL);
               };

               img.src = dataURL;
          };
    }]);
