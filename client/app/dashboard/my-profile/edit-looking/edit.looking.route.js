(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
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
    };

  getCurrentUser.$inject = ['common', '$q'];
  function getCurrentUser(common, $q) {
    var deferred = $q.defer();
    common.Auth.getCurrentUser(function(user) {
      deferred.resolve(user);
    });
    return deferred.promise;
  }

  getLooking.$inject = ['common', '$stateParams', 'currentUser'];
  function getLooking(common, $stateParams, currentUser) {
    var lookingId = $stateParams.id;
    return common.dataservice.getLooking(currentUser.id, lookingId);
  }

}());
