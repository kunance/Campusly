(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('fbLike', fbLike);

    fbLike.$inject = ['$window'];

    function fbLike($window) {
      return {
        restrict: 'A',
        scope: {
          fbLike: '=?'
        },
        link: function (scope, element, attrs) {
          element.bind("click", function () {
            if (!$window.fbAsyncInit) {
              $window.fbAsyncInit = function () {
                FB.init({
                  appId: '1482591365325802',
                  version: 'v2.3',
                  cookie: true,
                  xfbml: true
                });
                FB.getLoginStatus(function () {
                    renderLikeButton();
                })
              };
              (function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
            } else {
              renderLikeButton();
            }
            function renderLikeButton() {
              if (!!attrs.fbLike && !scope.fbLike) {
                var unbindWatch = scope.$watch('fbLike', function (newValue, oldValue) {
                  if (newValue) {
                    renderLikeButton();
                    unbindWatch();
                  }
                });
              } else {
                element.html('<div class="fb-like" data-href="https://www.facebook.com/campusly" data-layout="button_count" data-action="like" data-show-faces="true" data-share="true"></div>');
                FB.XFBML.parse(element.parent()[0]);
              }
            }
          })
        }
      }
    }
}());
