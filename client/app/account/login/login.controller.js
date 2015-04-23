(function () {
  "use strict";

    angular
    .module('app.account')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$scope', 'Auth', '$state', '$window', '$stateParams', 'common', '$cookieStore', '$rootScope'];

  function LoginCtrl( $scope, Auth, $state, $window, $stateParams, common, $cookieStore, $rootScope) {
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
    $rootScope.verificationTitle = $rootScope.verificationTitle || '';
    $rootScope.verificationContent = $rootScope.verificationContent || '';
    $rootScope.invalidToken = $rootScope.invalidToken || false;
    $rootScope.invalidPwdToken = $rootScope.invalidPwdToken || false;
    $rootScope.showEmail = $rootScope.showEmail || false;
    $rootScope.showPassword = $rootScope.showPassword || false;

    var mixpanelObject = $cookieStore.get('mp_bd202854d110bac5e72d7e034abdae01_mixpanel');
    var distinct_id = mixpanelObject.distinct_id;
    mixpanel.track("sign in",{distinct:distinct_id});

    $scope.$parent.seo = {
      pageTitle: 'Campusly Sign-in',
      pageDescription: 'Sign-in securely to Campusly'
    };

    $scope.toogleNewPasswordAddon= function () {
      $scope.newPasswordAddon = !$scope.newPasswordAddon;
      $scope.reset = $scope.newPasswordAddon ? 'I remember!' : 'Forget password?';
      $scope.errors.password = ' ';
    };

    if ($scope.confirmToken) {
      common.Auth.confirmMail($scope.confirmToken)
        .then( function(data) {
          $rootScope.verificationTitle = data.title;
          $rootScope.verificationContent = data.content;
          $rootScope.showEmail = true;
          $state.go('login');
        })
        .catch( function(err) {
          mixpanel.track("sign in - mail confirmation failure",{distinct:distinct_id});
          $rootScope.verificationTitle = err.data.title;
          $rootScope.verificationContent = err.data.content;
          $rootScope.invalidToken = true;
          $state.go('login');
        });
    }

    if ($scope.passwordResetToken) {
      $state.go('login');
      common.Auth.confirmResetedPassword($scope.passwordResetToken)
        .then(function() {
          $rootScope.showPassword = true;
          $state.go('login');
        })
        .catch(function() {
          mixpanel.track("sign in - password reset failure",{distinct:distinct_id});
          $rootScope.invalidPwdToken = true;
          $state.go('login');
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
                mixpanel.track("sign in - reject because of unconfirmed mail",{distinct:distinct_id});
              }
            });
          })
          .catch(function (err) {
            $scope.loading = false;
            $scope.errors = err.message;
            mixpanel.track("sign in - wrong username or password",{distinct:distinct_id});
          });
      } else {
        mixpanel.track("sign in - invalid form",{distinct:distinct_id});
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
        $scope.sendingEmail = true;
        common.Auth.sendConfirmationMail({userId: $scope.user.email})
          .then(function () {
            $scope.sendingEmail = false;
            $scope.showForm = false;
            $scope.invalidToken = false;
            $scope.success = null;
            $scope.verificationMailResend = true;
          })
          .catch(function () {
            $scope.sendingEmail = false;
            $scope.success = null;
            $scope.errors = {verifiedEmail: 'e-mail address ' + $scope.user.email + ' is not registered'};
            mixpanel.track("sign in - resend confirmation e-mail failure",{distinct:distinct_id});
          });
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
            mixpanel.track("sign in - send reset e-mail failure",{distinct:distinct_id});
          });
      }
    };

    $scope.loginOauth = function (provider) {
      $window.location.href = '/auth/' + provider;
    };

  }
}());


