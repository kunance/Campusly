(function () {
  "use strict";

  angular
      .module('app.account')
      .controller('SignupCtrl', SignupCtrl);

  SignupCtrl.$inject=['$scope', 'common', '$window', 'Auth', '$cookieStore'];

  function SignupCtrl($scope, common, $window, Auth, $cookieStore) {
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
    var mixpanelObject = $cookieStore.get('mp_bd202854d110bac5e72d7e034abdae01_mixpanel');
    var distinct_id = mixpanelObject.distinct_id;
    mixpanel.track("sign up",{distinct:distinct_id});

    vm.register = function (form) {
      vm.submitted = true;
      if (form.$valid) {
        common.Auth.createUser({
          firstname: vm.user.firstname,
          lastname: vm.user.lastname,
          email: vm.user.email,
          password: vm.user.password,
          distinct: distinct_id
        })
          .then(function () {
            // Account created, sending verification email, logging out user
            vm.loading = true;
              common.Auth.sendConfirmationMail({userId: vm.user.email})
                .then(function () {
                  vm.loading = false;
                  vm.showValidationMessage = true;
                }).catch(function () {
                  mixpanel.track("sign up - send confirm mail failure",{distinct:distinct_id});
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
                mixpanel.track("sign up - unique email violation",{distinct:distinct_id});
              }
              else if (field.type == 'Validation error'){
                field.message = 'Your email needs to be a valid .edu address!';
                vm.errors[field.path] = field.message;
                mixpanel.track("sign up - .edu email violation",{distinct:distinct_id});
              }
            });
          }
          });
        } else {
        mixpanel.track("sign up - invalid form",{distinct:distinct_id});
      }
    };

    vm.loginOauth = function (provider) {
      $window.location.href = '/auth/' + provider;
    };
  }

}());


