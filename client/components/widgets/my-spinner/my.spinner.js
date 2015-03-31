(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('mySpinner', mySpinner);

  //mySpinner.$inject = [];

  function mySpinner() {
    return {
      restrict: 'A',
      replace: true,
      scope: {
        title: '@'
      },
      link: function(scope, elem, attrs) {
        console.log(scope.title);
      },
      templateUrl: '../../../components/widgets/my-spinner/my.spinner.html'
    };
  }
}());
