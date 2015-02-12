(function () {
  "use strict";

  angular
    .module('app.account')
    .controller('PasswordCtrl', PasswordCtrl);

  PasswordCtrl.$inject = ['$scope', 'UserResource', 'common'];

  function PasswordCtrl($scope, UserResource, common) {
      $scope.errors = {};
      $scope.$parent.seo = {
      pageTitle:'Set up your account',
      pageDescription:'Some description'
    };

      $scope.changePassword = function(form) {
        $scope.submitted = true;
        if (form.$valid) {
          common.Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword)
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


