// do NOT include braces because we are NOT creating a new module instance 'app.account' , we are just retrieving it
(function () {
  "use strict";

  angular
    .module('app.account')
      .config(config);

  config.$inject = ['$stateProvider'];
  function config($stateProvider) {

    $stateProvider
      .state('logout', {
        controller: logout
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl',
        controllerAs: 'signup',
        authenticate:false
      })
      .state('settings', {
        url: '/settings/:focus',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        controllerAs: 'settings',
        resolve:{
          currentUser: getCurrentUser
        },
        authenticate:true
      });
  }

  getCurrentUser.$inject=['common', '$q'];
  function getCurrentUser(common, $q) {
    var deferred = $q.defer();
    common.Auth.getCurrentUser(function(user) {
      deferred.resolve(user);
    });
    return deferred.promise;
  }

  logout.$inject = ['$state', 'Auth'];
  function logout($state, Auth) {
      Auth.logout();
      $state.go('landing');
  }

}());
