(function () {
  "use strict";

  angular
    .module('app.account')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$scope', 'Auth', '$state', '$window','$location'];

  function LoginCtrl($scope, Auth, $state, $window, $location) {
      $scope.user = {};
      $scope.errors = {};

    $scope.$parent.seo = {
      pageTitle:'Please log in',
      pageDescription:'place for logging in'
    };

      $scope.login = function(form) {
        $scope.submitted = true;
        if (form.$valid) {
          Auth.login({
            email: $scope.user.email,
            password: $scope.user.password
          })
            .then(function() {
              $state.go('dashboard');
            })
            .catch(function(err) {
              $scope.errors.other = err.message;
            });
        }else{$scope.errors.other = "password's dont match"}
      };

      $scope.loginOauth = function(provider) {
        $window.location.href = '/auth/' + provider;
      };
    }


}());

