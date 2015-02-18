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
          getUserInfo: getUserInfo
        },
        authenticate: true
      });
  }

  function getUserInfo(common) {
    return common.Auth.getCurrentUser();
  }

}());
