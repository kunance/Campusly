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
          getAllRoommates:getAllRoommates
        },
        authenticate: true
      });
  }

  function getUserInfo(common) {
    return common.Auth.getCurrentUser();
  }

  function getEducations(common) {
    var dataservice = common.dataservice;
    var me = common.Auth.getCurrentUser();
    return dataservice.getAllEducations(me)
  }

  function getAddresses(common) {
    var dataservice = common.dataservice;
    var me = common.Auth.getCurrentUser();
    return dataservice.getAllAddresses(me);
  }

  function getAllUsers(common) {
    return common.$http.get('/api/users').success(function (users) {
      angular.forEach(users, function (user) {
        user.full = user.firstname + ' ' + user.lastname;
      });
    });
  }

  function getAllRoommates(common) {
    var dataservice = common.dataservice;
    var me = common.Auth.getCurrentUser();
    return dataservice.getAllRoommates(me)
  }
}());
