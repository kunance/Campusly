(function() {
  "use strict";

  angular
  .module('app.dashboard')
  .config(config);

  config.$inject=['$stateProvider'];

  function config ($stateProvider) {
    $stateProvider
    .state('editProfile', {
      url: '/editProfile/:focus',
      templateUrl: 'app/dashboard/my-profile/edit-profile/edit.profile.html',
      controller: 'EditProfileCtrl',
      controllerAs:'editProfile',
        resolve:{
          currentUser: getCurrentUser
        },
      authenticate: true,
      cache:false
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

}());
