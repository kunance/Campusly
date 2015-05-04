(function() {
  'use strict';

  /**
   * Removes server error when user updates input
   */
  angular.module('app.widgets')
    .directive('loading', loading);

  loading.$inject = ['requestNotificationChannel', '$timeout'];
  function loading (requestNotificationChannel, $timeout) {
    return {
      restrict: "A",
      scope: {
        minDuration: '=?'
      },
      link: function (scope, element) {
        // hide the element initially
        scope.minDuration = scope.minDuration || 200;
        element.hide();
        var pending;

        var startRequestHandler = function () {
          pending = true;
          $timeout(function() {
            if (pending)
              element.show();
          }, scope.minDuration);
        };

        var endRequestHandler = function () {
          pending = false;
          // got the request start notification, show the element
          element.hide();
        };

        requestNotificationChannel.onRequestStarted(scope, startRequestHandler);

        requestNotificationChannel.onRequestEnded(scope, endRequestHandler);
      }
    };
  }
}());
