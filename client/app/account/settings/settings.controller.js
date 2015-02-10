(function () {
  "use strict";

  angular
    .module('app.account')
    .controller('SettingsCtrl', SettingsCtrl);

  SettingsCtrl.$inject = ['$scope'];

  function SettingsCtrl($scope) {
   $scope.test = 'settings ctrl';
  }

}());
