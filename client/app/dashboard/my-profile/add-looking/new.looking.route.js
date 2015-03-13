
(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .config(function($stateProvider) {
      $stateProvider
        .state('addNewLooking', {
          url: '/addLooking',
          templateUrl: 'app/dashboard/my-profile/add-looking/new.looking.html',
          controller: 'NewLookingCtrl',
          controllerAs:'newLooking',
          resolve:{
            currentUser:getCurrentUser
          },
          authenticate: true
        });
    });

  function getCurrentUser(common, $q) {
    var deferred = $q.defer();
    common.Auth.getCurrentUser(function(user) {
      deferred.resolve(user);
    });
    return deferred.promise;
  }

}());
