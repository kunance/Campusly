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
          currentUser:getCurrentUser,
          getEducations: getEducations,
          getAddresses: getAddresses,
          getAllUsers:getAllUsers,
          getAllRoommates:getAllRoommates,
          getPets: getPets,
          getVehicles:getVehicles
        },
        authenticate: true
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
  getEducations.$inject = ['common', 'currentUser'];
  function getEducations(common, currentUser) {
      return common.dataservice.getAllEducations(currentUser.id);
  }
  getAddresses.$inject = ['common', 'currentUser'];
  function getAddresses(common, currentUser) {
      return common.dataservice.getAllAddresses(currentUser.id);
  }
  getAllUsers.$inject = ['UserResource'];
  function getAllUsers(UserResource) {
      return UserResource.query();
  }
  getAllRoommates.$inject = ['common', 'currentUser'];
  function getAllRoommates(common, currentUser) {
      return common.dataservice.getAllRoommates(currentUser.id);
  }
  getPets.$inject = ['common', 'currentUser'];
  function getPets(common, currentUser) {
      return common.dataservice.getAllPets(currentUser.id);
  }
  getVehicles.$inject = ['common', 'currentUser'];
  function getVehicles(common, currentUser) {
      return common.dataservice.getAllVehicles(currentUser.id);
  }


}());
