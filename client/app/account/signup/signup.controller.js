(function () {
  "use strict";

  angular
      .module('app.account')
      .controller('SignupCtrl', SignupCtrl);

  SignupCtrl.$inject=['$scope', 'common', '$state', '$window', 'Auth', '$location'];

  function SignupCtrl($scope, common, $state, $window, Auth, $location) {
    var vm = this;
    vm.user = {};
    vm.user.confirmPassword = '';
    vm.errors = {};
    vm.loading = false;
    vm.showValidationMessage = false;
    $scope.$parent.seo = {
      pageTitle:'Campusly Sign-up',
      pageDescription:'Free Sign-up for Campusly'
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
          .then(function (user) {
            // Account created, sending verification email, logging out user
            vm.loading = true;
              common.Auth.sendConfirmationMail({userId: vm.user.email}, function(){
                vm.loading = false;
                vm.showValidationMessage = true;
              });
              Auth.logout();
          })
          .catch(function (err) {
            err = err.data;
            vm.errors = {};
          if (err.name) {
            angular.forEach(err.errors, function (field) {
              if (field.type == 'unique violation'){
                field.message = 'You have already signed-up! Please Sign-in.';
                vm.errors[field.path] = field.message;
              }
              if (field.type == 'Validation error'){
                field.message = 'Your email needs to be a valid .edu address!';
                vm.errors[field.path] = field.message;
              }
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


