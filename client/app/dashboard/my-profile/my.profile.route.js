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

  function getCurrentUser(common, $q) {
    var deferred = $q.defer();
    common.Auth.getCurrentUser(function(user) {
      deferred.resolve(user);
    });
    return deferred.promise;
  }

  function getEducations(common, currentUser) {
      return common.dataservice.getAllEducations(currentUser.id);
  }

  function getAddresses(common, currentUser) {
      return common.dataservice.getAllAddresses(currentUser.id);
  }

  function getAllUsers(currentUser, UserResource) {
    if(currentUser){
    return UserResource.query(function (users) {})};
  }

  function getAllRoommates(common, currentUser) {
      return common.dataservice.getAllRoommates(currentUser.id);
  }

  function getPets(common, currentUser) {
      return common.dataservice.getAllPets(currentUser.id)
  }

  function getVehicles(common, currentUser) {
      return common.dataservice.getAllVehicles(currentUser.id)
  }


}());
