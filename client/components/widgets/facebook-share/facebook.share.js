(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('fbLike', [
      '$window', '$rootScope', function ($window, $rootScope) {
        return {
          restrict: 'A',
          scope: {
            fbLike: '=?'
          },
          link: function (scope, element, attrs) {
            if (!$window.FB) {
                $.getScript('//connect.facebook.net/en_US/sdk.js', function () {
                  $window.fbAsyncInit = function() {
                    console.log('async call trigger');
                    $window.FB.init({
                      appId      : '1482591365325802',
                      xfbml      : true,
                      version    : 'v2.3',
                      cookie     : true
                    });
                  };
                renderLikeButton();
              });
            } else {
              renderLikeButton();
            }

            var watchAdded = false;
            function renderLikeButton() {
              if (!!attrs.fbLike && !scope.fbLike && !watchAdded) {
                // wait for data if it hasn't loaded yet
                var watchAdded = true;
                var unbindWatch = scope.$watch('fbLike', function (newValue, oldValue) {
                  if (newValue) {
                    renderLikeButton();
                    // only need to run once
                    unbindWatch();
                  }
                });
                return;
              } else {
                //change class to fb-share in order to support multiple friends
                element.html('<div class="fb-like"' + (!!scope.fbLike ? ' data-href="' + scope.fbLike + '"' : '') + ' data-layout="button_count" data-action="like" data-show-faces="true" data-share="true"></div>');
                $window.FB.XFBML.parse(element.parent()[0]);
              }
            }
          }
        };
      }
    ]);

}());
