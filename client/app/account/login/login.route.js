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
        authenticate:false,
        cache: false
      })
      .state('loginWithToken', {
        url: '/login/:sessionToken',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login',
        resolve:{
          currentUser:getCurrentUser
        },
        authenticate:false,
        cache: false
      })
      .state('confirmWithCode', {
        url: '/loginVerify/:confirmToken',
        controller: 'LoginCtrl',
        resolve:{
          currentUser:getCurrentUser
        },
        authenticate: false,
        cache: false
      })
      .state('resetPwd', {
        url: '/loginPwdReset/:passwordResetToken',
        controller: 'LoginCtrl',
        resolve:{
          currentUser:getCurrentUser
        },
        authenticate: false,
        cache: false
      })
      .state('unsubscribe', {
        url: '/unsubscribe/:userEmail',
        controller: 'LoginCtrl',
        resolve:{
          currentUser:getCurrentUser
        },
        authenticate: false,
        cache: false
      });
  }

  getCurrentUser.$inject = ['common', '$q'];
  function getCurrentUser(common, $q) {
    var deferred = $q.defer();
    common.Auth.getCurrentUser(function(user) {
      if(user.confirmedEmail===false){
        common.Auth.logout();
      } else {
        deferred.resolve(user);
      }
    });
    return deferred.promise;
  }

}());
