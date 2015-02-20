(function () {
  "use strict";

  angular
    .module('app.account')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('dashboard.myProfile.step1', {
        url: '/step1',
        templateUrl: 'app/dashboard/my-profile/step1/step1.html',
        controller: 'Step1Ctrl',
        controllerAs:'step1',
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
