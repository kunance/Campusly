(function () {
  "use strict";

    angular
    .module('app.account')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$scope', 'Auth', '$state', '$window', '$stateParams', 'common', '$rootScope'];

  function LoginCtrl( $scope, Auth, $state, $window, $stateParams, common, $rootScope) {
    /*
     * Defining initial variables
     */
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

    // Mixpanel
    if(window.Gdistinct_id) {
      mixpanel.track("sign in");
    }

    // SEO
    $scope.$parent.seo = {
      pageTitle: 'Campusly Sign-in',
      pageDescription: 'Sign-in securely to Campusly'
    };

    /*
     * Name:
     * High Level Description: allows user to toggle between selecting forgot password or that they remember password
     * Input:
     * Return:
     * Side effects:
     */
    $scope.toogleNewPasswordAddon= function () {
      $scope.newPasswordAddon = !$scope.newPasswordAddon;
      $scope.reset = $scope.newPasswordAddon ? 'I remember!' : 'Forget password?';
      $scope.errors.password = ' ';
    };

    /*
     * Name: confirmToken
     * High Level Description: if email is confirmed then user is logged in
     * Input: user clicks on the confirm email from their inbox
     * Return:
     * Side effects:
     */
    if ($scope.confirmToken) {
      common.Auth.confirmMail($scope.confirmToken)
        .then( function(data) {
          $rootScope.verificationTitle = data.title;
          $rootScope.verificationContent = data.content;
          $rootScope.showEmail = true;
          $state.go('login');
        })
        /*
         * Name: email confirmation failed
         * High Level Description: email confirmation has a 60min timer
         * Input: user clicks on the confirm email from their inbox after 60min
         * Return:
         * Side effects: user has to re-submit their email confirmation
         */
        .catch( function(err) {
          mixpanel.track("sign in - mail confirmation failure",{distinct:Gdistinct_id});
          $rootScope.verificationTitle = err.data.title;
          $rootScope.verificationContent = err.data.content;
          $rootScope.invalidToken = true;
          $state.go('login');
        });
    }

    /*
     * Name: password reset
     * High Level Description: enables user to reset their password
     * Input: user has to input their email and a new password. Then a new email is sent to their address for confirmation.
     * Return:
     * Side effects: user has to re-submit their email confirmation
     */
    if ($scope.passwordResetToken) {
      $state.go('login');
      common.Auth.confirmResetedPassword($scope.passwordResetToken)
        .then(function() {
          $rootScope.showPassword = true;
          $state.go('login');
        })
        .catch(function() {
          mixpanel.track("sign in - password reset failure",{distinct:Gdistinct_id});
          $rootScope.invalidPwdToken = true;
          $state.go('login');
        });
    }

    /*
     * Name: login function
     * High Level Description: logs in the user if login is successful
     * Input:
     * Return: user is routed to either the dashboard or the state to which they intended to go. If password failed then tells the user
     * there was a problem logging in
     * Side effects:
     */
    $scope.login = function (form) {
      $scope.submitted = true;
      if(form.$valid) {
        //$scope.loading = true;
        Auth.login({
          email: $scope.user.email.toLowerCase(),
          password: $scope.user.password
        })
          .then(function () {
            common.Auth.getCurrentUser(function (user) {
              if (user.confirmedEmail) {
                  $scope.success = false;
                  $scope.showForm = false;
                if($rootScope.redirectTo){
                  $state.go($rootScope.redirectTo.state, {param:$rootScope.redirectTo.value, allIds:$rootScope.redirectTo.value});
                } else {
                  $state.go('dashboard');
                }
              } else {
                $scope.loading = false;
                $scope.showResendPartial = true;
                $scope.errors = {verifiedEmail: user.firstname+', your e-mail address is not verified. Please verify your Campusly account.'};
                mixpanel.track("sign in - reject because of unconfirmed mail",{distinct:Gdistinct_id});
              }
            });
          })
          .catch(function (err) {
            $scope.loading = false;
            $scope.errors = err.message;
            mixpanel.track("sign in - wrong username or password",{distinct:Gdistinct_id});
          });
      } else {
        mixpanel.track("sign in - invalid form",{distinct:Gdistinct_id});
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

    /*
     * Name: resend email function
     * High Level Description: sends email confirmation if user did not confirm within first 60min
     * Input:
     * Return: sends user an email
     * Side effects:
     */
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
            mixpanel.track("sign in - resend confirmation e-mail failure",{distinct:Gdistinct_id});
          });
    };

    /*
     * Name: password reset function
     * High Level Description: sends user password reset confirmation if user did not confirm within first 60min
     * Input: email and new password
     * Return: sends user an email
     * Side effects:
     */
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
          .catch(function (err) {
            $scope.sendingEmail = false;
            $scope.pwdResetMailSend = false;
            $scope.errors = {verifiedEmail: err.data.message};
            mixpanel.track("sign in - send reset e-mail failure",{distinct:Gdistinct_id});
          });
      }
    };

    $scope.loginOauth = function (provider) {
      $window.location.href = '/auth/' + provider;
    };

  }
}());


