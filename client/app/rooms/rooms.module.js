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
      authenticate: true
    });
  }
}());
