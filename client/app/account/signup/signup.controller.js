(function () {
  "use strict";

  angular
      .module('app.account')
      .controller('SignupCtrl', SignupCtrl);

  SignupCtrl.$inject=['$scope', 'common', '$state', '$window', 'Auth', '$location'];

  function SignupCtrl($scope, common, $state, $window, Auth, $location) {

    // vm for view model .... https://github.com/johnpapa/angularjs-styleguide#style-y032
    /* jshint validthis: true */
    var vm = this;
    vm.user = {};
    vm.user.confirmPassword = '';
    vm.errors = {};
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
              common.Auth.sendConfirmationMail({userId: vm.user.email}, function(){
                vm.errors = { verification: vm.user.firstname+' please verify your Campusly account. Verification mail has been sent to '+ vm.user.email };
              });
              Auth.logout();
          })
          .catch(function (err) {
            err = err.data;
            vm.errors = {};
          // Update validity of form fields that match the sequelize errors
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


