(function () {
  "use strict";

  angular
      .module('app.account')
      .controller('SignupCtrl', SignupCtrl);

  SignupCtrl.$inject=['$scope', 'common', '$window', 'Auth'];

  function SignupCtrl($scope, common, $window, Auth) {
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

    if(window.Gdistinct_id) {
      mixpanel.track("sign up");
    }

    vm.register = function (form) {
      vm.submitted = true;
      if (form.$valid) {
        common.Auth.createUser({
          firstname: vm.user.firstname,
          lastname: vm.user.lastname,
          email: vm.user.email.toLowerCase(),
          password: vm.user.password
        })
          .then(function () {
            // Account created, sending verification email, logging out user
            vm.loading = true;
              common.Auth.sendConfirmationMail({userId: vm.user.email})
                .then(function () {
                  vm.loading = false;
                  vm.showValidationMessage = true;
                  mixpanel.track("sign up - send confirm email",{distinct:Gdistinct_id});
                  mixpanel.alias(vm.user.email);
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
                mixpanel.track("sign up - unique email violation",{distinct:Gdistinct_id});
              }
              if (field.type == 'Validation error'){
                field.message = 'Your email needs to be a valid .edu address!';
                vm.errors[field.path] = field.message;
                mixpanel.track("sign up - .edu email violation",{distinct:Gdistinct_id});
              }
            });
          }
          });
        } else {
        mixpanel.track("sign up - invalid form",{distinct:Gdistinct_id});
      }
    };

    vm.loginOauth = function (provider) {
      $window.location.href = '/auth/' + provider;
    };
  }

}());


