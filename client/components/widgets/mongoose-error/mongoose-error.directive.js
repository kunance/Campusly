(function () {
  "use strict";

  angular.module('RentedApp')
    .directive('mongooseError', function () {
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
          element.on('keydown', function() {
            return ngModel.$setValidity('mongoose', true);
          });
        }
      };
    });


}());

/**
 * Removes server error when user updates input
 */
