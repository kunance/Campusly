(function() {
  "use strict";

  angular
    .module('app.dashboard')
    .config(config);

  config.$inject=['$stateProvider'];

  function config ($stateProvider) {
    $stateProvider
      .state('myProfile', {
        url: '/myProfile',
        templateUrl: 'app/dashboard/my-profile/my.profile.html',
        controller: 'MyProfileCtrl',
        controllerAs:'myProfile',
        resolve: {
          currentUser:getCurrentUser
        },
        authenticate: true,
        cache:false
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
