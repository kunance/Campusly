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
          getAddresses: getAddresses
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


}());
