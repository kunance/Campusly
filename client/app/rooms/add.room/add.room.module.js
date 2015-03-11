(function() {
  "use strict";

  angular
    .module('app.addRoom', [])
    .config(config);

  config.$inject=['$stateProvider', '$urlRouterProvider'];

  function config ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('addRoom', {
      url: '/addRoom',
      templateUrl: 'app/rooms/add.room/add.room.html',
      controller: 'AddNewRoomCtrl',
      controllerAs:'vm',
      bindToController: true,
      authenticate: true
    });
  }
}());

