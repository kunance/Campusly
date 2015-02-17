(function () {
  "use strict";

  angular
    .module('app.account')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('settings.finance.edit', {
        url: '/edit/:id',
        templateUrl: 'app/account/settings/finance/edit/edit.finance.html',
        controller: 'EditFinanceCtrl',
        controllerAs:'editFinance',
        resolve:{
          getFinance: getFinance
        },
        authenticate: true
      });
  }

  function getFinance(common, $stateParams) {
    var financeId = $stateParams.id;
    var dataservice = common.dataservice;
    var me = common.Auth.getCurrentUser();
    return dataservice.getFinance(me, financeId);
  }

}());
