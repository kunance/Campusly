(function () {
  "use strict";

  angular
    .module('app.account')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('dashboard.myProfile.step2', {
        url: '/step2',
        templateUrl: 'app/dashboard/my-profile/step2/step2.html',
        controller: 'Step2Ctrl',
        controllerAs:'step2',
        authenticate: true
      });
  }

}());
