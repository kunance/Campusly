(function () {
  "use strict";

  angular
    .module('app.account')
    .controller('SettingsCtrl', SettingsCtrl);

  SettingsCtrl.$inject = ['$scope', 'UserResource', 'Auth'];

  function SettingsCtrl($scope, UserResource, Auth) {
      $scope.errors = {};
      $scope.$parent.seo = {
      pageTitle:'Set up your account',
      pageDescription:'Some description'
    };
    mixpanel.track("visited settings view new");

      $scope.changePassword = function(form) {
        $scope.submitted = true;
        if (form.$valid) {
          Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword)
            .then(function() {
              $scope.message = 'Password successfully changed.';
            })
            .catch(function() {
              form.password.$setValidity('mongoose', false);
              $scope.errors.other = 'Incorrect password';
              $scope.message = '';
            });
        }
      };
    }

}());


