(function() {
  "use strict";

  angular
    .module('app.dashboard')
    .config(config);

  config.$inject=['$stateProvider'];

  function config ($stateProvider) {
    $stateProvider
      .state('dashboard.myProfile', {
        url: '/myProfile',
        templateUrl: 'app/dashboard/my-profile/my.profile.html',
        controller: 'MyProfileCtrl',
        controllerAs:'myProfile',
        resolve: {
          getUserInfo: getUserInfo,
          getEducations: getEducations,
          getAddresses: getAddresses,
          getAllUsers:getAllUsers,
          getAllRoommates:getAllRoommates,
          getPets: getPets,
          getVehicles:getVehicles
        },
        authenticate: true
      });
  }

  function getUserInfo(common, $q) {
    var deffered = $q.defer();
    deffered.resolve(common.Auth.getCurrentUser());
    return deffered.promise;
  }

  function getEducations(common, $q) {
    var deffered = $q.defer();
    var dataservice = common.dataservice;
    var me = common.Auth.getCurrentUser();
    deffered.resolve(dataservice.getAllEducations(me));
    return deffered.promise;
  }

  function getAddresses(common, $q) {
    var deffered = $q.defer();
    var dataservice = common.dataservice;
    var me = common.Auth.getCurrentUser();
    deffered.resolve(dataservice.getAllAddresses(me));
    return deffered.promise;
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
    deffered.resolve(dataservice.getAllRoommates(me));
    return deffered.promise;
  }

  function getPets(common) {
    var dataservice = common.dataservice;
    var me = common.Auth.getCurrentUser();
    return dataservice.getAllPets(me)
  }

  function getVehicles(common) {
    var dataservice = common.dataservice;
    var me = common.Auth.getCurrentUser();
    return dataservice.getAllVehicles(me)
  }

}());
