(function () {
  "use strict";

  angular
    .module('app.account')
    .config(function($stateProvider) {
      $stateProvider
        .state('settings.finance.new', {
          url: '/new',
          templateUrl: 'app/account/settings/finance/add/new.finance.html',
          controller: 'AddFinanceCtrl',
          controllerAs:'addFinance',
          authenticate: true
        });
    });

}());
