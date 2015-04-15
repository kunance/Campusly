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
            data:getData
          }
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

  getData.$inject = ['common', '$stateParams', 'currentUser', '$q'];
  function getData(common, $stateParams, currentUser, $q) {
    var lookingId = $stateParams.id;
    var looking = common.dataservice.getLooking(currentUser.id, lookingId);
    var univ = common.dataservice.getAllUniversities();
    var edu = common.dataservice.getAllEducations(currentUser.id);
    return $q.all([looking.$promise, univ.$promise, edu.$promise]);
  }

}());
