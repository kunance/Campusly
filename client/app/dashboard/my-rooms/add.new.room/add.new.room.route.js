(function() {
  "use strict";

  angular
    .module('app.dashboard')
    .config(config);

  config.$inject=['$stateProvider', '$urlRouterProvider'];

  function config ($stateProvider, $urlRouterProvider) {
    // $urlRouterProvider.when('/dashboard', '/dashboard/summary');
    $stateProvider
      .state('dashboard.myRooms.addNew', {
        url: '/addNew',
        templateUrl: 'app/dashboard/my-rooms/add.new.room/add.new.room.html',
        controller: 'AddNewRoomCtrl',
        controllerAs:'addNewRoom',
        authenticate: true
      });
  }
}());

