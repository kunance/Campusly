(function () {
  "use strict";

  angular
    .module('app.account')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('askForPwdReset', {
        url: '/pwdreset',
        templateUrl: 'app/account/pwdreset/pwdreset.html',
        controller: 'PwdResetCtrl',
        controllerAs: 'reset'
      })
      .state('resetPwd', {
        url: '/pwdreset/:passwordResetToken',
        templateUrl: 'app/account/pwdreset/pwdreset.html',
        controller: 'PwdResetCtrl',
        controllerAs: 'reset'
      });
  }


}());
