(function() {
  "use strict";

  angular
    .module('app.editRoom', [])
    .config(config);

  config.$inject=['$stateProvider', '$urlRouterProvider'];

  function config ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('editRoom', {
      url: '/editRoom/:id',
      templateUrl: 'app/rooms/edit.room/edit.room.html',
      controller: 'EditRoomCtrl',
      controllerAs:'vm',
      bindToController: true,  // need angular 1.3 for bindToController
      resolve:{
        currentUser:getCurrentUser,
        getAllUsers:getAllUsers,
        getAllRoommates:getAllRoommates
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

  getAllUsers.$inject = ['UserResource'];
  function getAllUsers(UserResource) {
      return UserResource.query(function (users) {})
  }

  getAllRoommates.$inject = ['common', 'currentUser'];
  function getAllRoommates(common, currentUser) {
    return common.dataservice.getAllRoommates(currentUser.id);
  }

}());


