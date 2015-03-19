(function () {
  "use strict";

  angular
    .module('app.account')
    .config(config);


  config.$inject = ['$stateProvider'];
  function config($stateProvider) {

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl',
        resolve:{
          currentUser:getCurrentUser
        },
        authenticate:false
      })
      .state('loginWithToken', {
        url: '/login/:sessionToken',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login',
        resolve:{
          currentUser:getCurrentUser
        },
        authenticate:false
      })
      .state('confirmWithCode', {
        url: '/loginVerify/:confirmToken',
        templateUrl: 'app/account/confirm/confirm.html',
        controller: 'LoginCtrl',
        resolve:{
          currentUser:getCurrentUser
        },
        authenticate: false
      })
      .state('resetPwd', {
        url: '/loginPwdReset/:passwordResetToken',
        templateUrl: 'app/account/pwdreset/pwdreset.html',
        controller: 'LoginCtrl',
        resolve:{
          currentUser:getCurrentUser
        },
        authenticate: false
      });
  }

  getCurrentUser.$inject = ['common', '$q'];
  function getCurrentUser(common, $q) {
    var deferred = $q.defer();
    common.Auth.getCurrentUser(function(user) {
      deferred.resolve(user);
    });
    return deferred.promise;
  }

}());
