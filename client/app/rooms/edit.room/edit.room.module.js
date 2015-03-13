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
        getAllUsers:getAllUsers,
        getAllRoommates:getAllRoommates
      },
      authenticate: true
    });
  }

  function getAllUsers(common, $q) {
    var deffered = $q.defer();
    var me = common.Auth.getCurrentUser();
    deffered.resolve( common.$http({method:'get', url:'/api/users', data:{"id":me.id}}).success(function (users) {
      angular.forEach(users, function (user) {
        user.full = user.firstname + ' ' + user.lastname;
      });
    }));
    return deffered.promise;
  }

  function getAllRoommates(common,$q) {
    var deffered = $q.defer();
    var dataservice = common.dataservice;
    var me = common.Auth.getCurrentUser();
    deffered.resolve(dataservice.getAllRoommates(me.id));
    return deffered.promise;
  }

}());


