(function () {
  "use strict";

  angular
    .module('app.account')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('dashboard.myProfile.step3', {
        url: '/step3',
        templateUrl: 'app/dashboard/my-profile/step3/step3.html',
        controller: 'Step3Ctrl',
        controllerAs:'step3',
        authenticate: true
      });
  }

}());
