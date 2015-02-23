(function () {
  "use strict";

  angular
      .module('app.account')
      .controller('SignupCtrl', SignupCtrl);

  SignupCtrl.$inject=['$scope', 'common', '$state', '$window'];

  function SignupCtrl($scope, common, $state, $window) {

    // vm for view model .... https://github.com/johnpapa/angularjs-styleguide#style-y032
    /* jshint validthis: true */
    var vm = this;
    vm.user = {};
    vm.errors = {};

    $scope.$parent.seo = {
      pageTitle:'Please sign in',
      pageDescription:'place for signing in'
    };
    mixpanel.track("sign up");



    vm.register = function (form) {
      vm.submitted = true;
      if (form.$valid) {
        common.Auth.createUser({
          firstname: vm.user.firstname,
          lastname: vm.user.lastname,
          email: vm.user.email,
          password: vm.user.password
        })
          .then(function () {
            // Account created, redirect to dashboard
            $state.go('dashboard');
          })
          .catch(function (err) {
            err = err.data;
            vm.errors = {};
          // Update validity of form fields that match the sequelize errors
          if (err.name) {
            angular.forEach(err.fields, function (field) {
              form[field].$setValidity('mongoose', false);
              vm.errors[field] = err.message;
            });
          }
          });
        }
    };

    vm.loginOauth = function (provider) {
      $window.location.href = '/auth/' + provider;
    };
  }

}());


