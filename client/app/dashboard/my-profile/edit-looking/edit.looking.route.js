(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .config(function($stateProvider) {
      $stateProvider
        .state('editLooking', {
          url: '/editLooking/:id',
          templateUrl: 'app/dashboard/my-profile/edit-looking/edit.looking.html',
          controller: 'EditLookingCtrl',
          controllerAs:'editLooking',
          authenticate: true,
          resolve:{
            currentUser:getCurrentUser,
            getLooking:getLooking
          }
        });
    });

  function getCurrentUser(common, $q) {
    var deferred = $q.defer();
    common.Auth.getCurrentUser(function(user) {
      deferred.resolve(user);
    });
    return deferred.promise;
  }

  function getLooking(common, $stateParams, currentUser) {
    var lookingId = $stateParams.id;
    return common.dataservice.getLooking(currentUser.id, lookingId);
  }

}());
