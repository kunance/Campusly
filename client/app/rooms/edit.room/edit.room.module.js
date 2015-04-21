(function() {
  "use strict";

  angular
    .module('app.editRoom', [])
    .config(config);

  config.$inject=['$stateProvider'];

  function config ($stateProvider) {
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
      cache:false,
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
      var univ = common.dataservice.getAllUniversities();
      var edu = common.dataservice.getAllEducations(currentUser.id);
    return $q.all([user.$promise, roommates.$promise, room.$promise, univ.$promise, edu.$promise]);
  }

}());


