(function () {
  "use strict";

    angular
    .module('app.account')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$scope', 'Auth', '$state', '$window', '$stateParams', 'common', '$location', '$cookieStore', '$rootScope', 'currentUser'];

  function LoginCtrl( $scope, Auth, $state, $window, $stateParams, common, $location, $cookieStore, $rootScope, currentUser) {
    if(currentUser.confirmedEmail===false){
      common.Auth.logout();
    }
    $scope.showForm = true;
    $scope.sendingEmail = false;
    $scope.newPasswordAddon = false;
    $scope.showVerifyPartial = false;
    $scope.pwdResetMailSend = false;
    $scope.verificationMailResend = false;
    $scope.user = {};
    $scope.reset = '';
    $scope.errors = {};
    $scope.reset = $scope.newPasswordAddon ? 'I remember!' : 'Forget password?';
    $scope.confirmToken = $stateParams.confirmToken;
    $scope.passwordResetToken = $stateParams.passwordResetToken;

    $scope.$parent.seo = {
      pageTitle: 'Campusly Sign-in',
      pageDescription: 'Sign-in securely to Campusly'
    };

    $scope.toogleNewPasswordAddon= function () {
      $scope.newPasswordAddon = !$scope.newPasswordAddon;
      $scope.reset = $scope.newPasswordAddon ? 'I remember!' : 'Forget password?';
      $scope.errors.password = ' ';
    };

    $scope.success = $rootScope.verificationMessage;

    if ($scope.confirmToken) {
      common.Auth.confirmMail($scope.confirmToken)
        .then( function() {
          $state.go('login');
        })
        .catch( function() {
          $scope.$parent.invalidToken = true;
          $state.go('login');
        });
    }

    if ($scope.passwordResetToken) {
      $state.go('login');
      common.Auth.confirmResetedPassword($scope.passwordResetToken)
        .then( function() {
          $state.go('login');
        })
        .catch( function() {
          if($scope.$parent){
          $scope.$parent.invalidPwdToken = true;}
          else{
            $scope.invalidPwdToken = true;
            $state.go('login');
          }
        });
    }

    $scope.login = function (form) {
      $scope.submitted = true;
      if(form.$valid) {
        $scope.loading = true;
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
          .then(function () {
            common.Auth.getCurrentUser(function (user) {
              if (user.confirmedEmail) {
                  $scope.success = false;
                  $scope.showForm = false;
                  $state.go('dashboard');
              } else {
                $scope.loading = false;
                $scope.showResendPartial = true;
                $scope.errors = {verifiedEmail: user.firstname+', your e-mail address is not verified. Please verify your Campusly account.'};
              }
            });
          })
          .catch(function (err) {
            $scope.loading = false;
            $scope.errors = err.message;
          });
      }
    };

    $scope.close= function () {
      $scope.showForm = true;
      $scope.sendingEmail = false;
      $scope.newPasswordAddon = false;
      $scope.showVerifyPartial = false;
      $scope.pwdResetMailSend = false;
      $scope.verificationMailResend = false;
    };

    $scope.resendEmail = function(){
    //  if(form.email.$valid) {
        $scope.sendingEmail = true;
        common.Auth.sendConfirmationMail({userId: $scope.user.email})
          .then(function (response) {
            //console.log(response);
            $scope.sendingEmail = false;
            $scope.showForm = false;
            $scope.invalidToken = false;
            $scope.success = null;
            $scope.verificationMailResend = true;
            //$scope.errors = {verifiedEmail: 'Verification mail has been sent to ' + $scope.user.email + '.'};
          })
          .catch(function () {
            $scope.sendingEmail = false;
            $scope.success = null;
            $scope.errors = {verifiedEmail: 'e-mail address ' + $scope.user.email + ' is not registered'};
          });
    //  } else {$scope.errors = {verifiedEmail: "doesn't look like valid e-mail address"};}
    };

    $scope.sendPwdResetMail = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        $scope.sendingEmail = true;
        Auth.sendPwdResetMail($scope.user.email, $scope.user.newPassword)
          .then(function () {
            $scope.sendingEmail = false;
            $scope.pwdResetMailSend = true;
            $scope.showForm = false;
            $scope.errors = {resetPassword: 'Reset password mail has been sent to ' + $scope.user.email + '.'};
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


