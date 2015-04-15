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
          data:getData
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

  getData.$inject = ['common', 'currentUser', 'UserResource', '$q'];
  function getData(common, currentUser, UserResource, $q) {
    var edu = common.dataservice.getAllEducations(currentUser.id);
    var adr = common.dataservice.getAllAddresses(currentUser.id);
    var users = UserResource.query();
    var roommates = common.dataservice.getAllRoommates(currentUser.id);
    var pets = common.dataservice.getAllPets(currentUser.id);
    var veh = common.dataservice.getAllVehicles(currentUser.id);
    return $q.all([edu.$promise, adr.$promise, users.$promise, roommates.$promise, pets.$promise, veh.$promise]);
  }

}());
