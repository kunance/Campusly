(function () {
  "use strict";

    angular
    .module('app.account')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$scope', 'Auth', '$state', '$window', '$stateParams', 'common', '$location'];

  function LoginCtrl($scope, Auth, $state, $window, $stateParams, common, $location) {
    $scope.user = {};
    $scope.errors = {};
    $scope.showVerifyPartial = false;
    $scope.$parent.seo = {
      pageTitle: 'Campusly Sign-in',
      pageDescription: 'Sign-in securely to Campusly'
    };
    mixpanel.track("sign in");

    $scope.confirmToken = $stateParams.confirmToken;
    $scope.invalidToken = false;

    if ($scope.confirmToken) {
      common.Auth.confirmMail($scope.confirmToken)
        .then( function() {
         $location.path('/dashboard');
        })
        .catch( function() {
          $scope.invalidToken = true;
        });
    }

    $scope.login = function (form) {
      $scope.submitted = true;
      if (form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
          .then(function () {
            $scope.me = Auth.getCurrentUser(function (user) {
              if(user.confirmedEmail===true){
                $state.go('dashboard');
              }else{
                $scope.showResendPartial = true;
                $scope.errors.other ={verifiedEmail:'Your email address needs to be verified.'};
                Auth.logout();
              }
            });
          })
          .catch(function (err) {
            $scope.errors.other = err.message;
          });
      }
    };

    $scope.resend = function(email){
      common.Auth.sendConfirmationMail({userId: email}, function(){
        $scope.errors.other ={verifiedEmail:'Verification mail has been sent to '+ email+'.'};
      });
    };

    $scope.loginOauth = function (provider) {
      $window.location.href = '/auth/' + provider;
    };
  }
}());


