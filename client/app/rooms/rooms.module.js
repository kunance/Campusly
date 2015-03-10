(function() {
  "use strict";

  angular
    .module('app.rooms', [])
    .config(config);

  config.$inject=['$stateProvider', '$urlRouterProvider'];

  function config ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('rooms', {
      url: '/rooms',
      templateUrl: 'app/rooms/rooms.html',
      controller: 'RoomsCtrl',
      controllerAs:'rooms',
        resolve:{
          getAllRooms:getAllRooms
        },
      authenticate: true
    });
  }

  function getAllRooms(common) {
    var dataservice = common.dataservice;
    return dataservice.getEveryRoom();
  }

}());
