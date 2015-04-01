(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('mySpinner', mySpinner);

  function mySpinner() {
    return {
      restrict: 'A',
      replace: true,
      scope: {
        title: '@'
      },
      link: function(scope, elem, attrs) {
      },
      templateUrl: 'components/widgets/my-spinner/my.spinner.html'
    };
  }
}());
