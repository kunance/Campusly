(function() {
  "use strict";

  angular
    .module('app.roomDetail', [])
    .config(config);

  config.$inject=['$stateProvider', '$urlRouterProvider'];

  function config ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('roomDetail', {
        url: '/roomDetail',
        templateUrl: 'app/roomDetail/roomDetail.html',
        controller: 'RoomDetailCtrl',
        controllerAs:'room',
        authenticate: true
      });
  }
}());

