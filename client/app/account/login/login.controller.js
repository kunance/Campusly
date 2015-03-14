(function () {
  "use strict";

    angular
    .module('app.account')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$scope', 'Auth', '$state', '$window', '$location'];

  function LoginCtrl($scope, Auth, $state, $window, $location) {
    $scope.user = {};
    $scope.errors = {};

    $scope.$parent.seo = {
      pageTitle: 'Campusly Sign-in',
      pageDescription: 'Sign-in securely to Campusly'
    };
    mixpanel.track("sign in");

    $scope.login = function (form) {
      $scope.submitted = true;
      if (form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
          .then(function () {
            $state.go('dashboard');
          })
          .catch(function (err) {
            $scope.errors.other = err.message;
          });
      }
    };

    $scope.loginOauth = function (provider) {
      $window.location.href = '/auth/' + provider;
    };
  }
}());


