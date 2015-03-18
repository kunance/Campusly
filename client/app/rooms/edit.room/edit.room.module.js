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
        data:getData
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

  getData.$inject = ['UserResource', 'common', 'currentUser', '$q', 'RoomListing', '$stateParams'];
  function getData(UserResource, common, currentUser, $q, RoomListing, $stateParams) {
      var user = UserResource.query();
      var roommates= common.dataservice.getAllRoommates(currentUser.id);
      var room = RoomListing.get({userId: currentUser.id, id: $stateParams.id});
    return $q.all([user.$promise, roommates.$promise, room.$promise]);
  }

}());


