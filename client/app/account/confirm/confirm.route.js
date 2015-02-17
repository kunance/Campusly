(function () {
  "use strict";

  angular
    .module('app.account')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('confirm', {
        url: '/confirm',
        templateUrl: 'app/account/confirm/confirm.html',
        controller: 'ConfirmCtrl',
        controllerAs:'confirm',
        authenticate: true
      })
      .state('confirmWithCode', {
        url: '/confirm/:confirmToken',
        templateUrl: 'app/account/confirm/confirm.html',
        controller: 'ConfirmCtrl',
        controllerAs: 'confirm'
     })
  }


}());
