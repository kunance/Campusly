(function() {
  "use strict";

  angular
    .module('app.dashboard')
    .config(config);

  config.$inject=['$stateProvider', '$urlRouterProvider'];

  function config ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('dashboard.myRooms', {
        url: '/myRooms',
        templateUrl: 'app/dashboard/my-rooms/my.rooms.html',
        controller: 'MyRoomsCtrl',
        controllerAs:'myRooms',
        //resolve:{
        //  getAllProperties: getAllProperties
        //},
        authenticate: true
      });

    //function getAllProperties(common) {
    //  var dataservice = common.dataservice;
    //  var me = common.Auth.getCurrentUser();
    //  return dataservice.getAllProperties(me)
    //}
  }
}());
