(function () {
  "use strict";

    angular
    .module('app.account')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$scope', 'Auth', '$state', '$window', '$stateParams', 'common', '$location'];

  function LoginCtrl($scope, Auth, $state, $window, $stateParams, common, $location) {
    $scope.user = {};
    $scope.reset = '';
    $scope.errors = {};
    $scope.showVerifyPartial = false;
    $scope.newPasswordAddon = false;
    $scope.reset = $scope.newPasswordAddon ? 'you recalled password?' : 'forgot password?';
    $scope.confirmToken = $stateParams.confirmToken;
    $scope.invalidToken = false;
    var passwordResetToken = $stateParams.passwordResetToken;
    var pwdResetState = 'mailform';
    $scope.pwdResetMailSend = false;

    $scope.$parent.seo = {
      pageTitle: 'Campusly Sign-in',
      pageDescription: 'Sign-in securely to Campusly'
    };

    $scope.toogleNewPasswordAddon= function () {
      $scope.newPasswordAddon = !$scope.newPasswordAddon;
      $scope.reset = $scope.newPasswordAddon ? 'you recalled password?' : 'forgot password?';
      $scope.errors.password = ' ';
    };

    if ($scope.confirmToken) {
      common.Auth.confirmMail($scope.confirmToken)
        .then( function() {
         $location.path('/dashboard');
        })
        .catch( function() {
          $scope.invalidToken = true;
        });
    }

    if (passwordResetToken) {
      $state.go('login');
      Auth.confirmResetedPassword(passwordResetToken, function (data) {
        pwdResetState = 'valid_token';
      });
    }

    $scope.login = function (form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
          .then(function () {
            $scope.me = Auth.getCurrentUser(function (user) {
              if (user.confirmedEmail === true) {
                $state.go('dashboard');
              } else {
                $scope.showResendPartial = true;
                $scope.errors = {verifiedEmail: 'Your email address needs to be verified.'};
                Auth.logout();
              }
            });
          })
          .catch(function (err) {
            $scope.errors = err.message;
          });
      }
    };

    $scope.resendEmail = function(email){
      common.Auth.sendConfirmationMail({userId: email}, function(){
        $scope.errors ={verifiedEmail:'Verification mail has been sent to '+ email+'.'};
      });
    };

    $scope.sendPwdResetMail = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        $scope.pwdResetMailSend = true;
        Auth.sendPwdResetMail($scope.user.email, $scope.user.newPassword)
          .then(function () {
            $scope.errors = {resetPassword: 'Reset password mail has been sent to ' + $scope.user.email + '.'};
            pwdResetState = 'mailsent';
          })
          .catch(function () {
            $scope.pwdResetMailSend = false;
          });
      }
    };

    mixpanel.track("sign in");

    $scope.loginOauth = function (provider) {
      $window.location.href = '/auth/' + provider;
    };
  }
}());


