(function () {
  "use strict";

  angular
    .module('app.account')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('settings.finance', {
        url: '/finance',
        templateUrl: 'app/account/settings/finance/finance.html',
        controller: 'FinanceCtrl',
        controllerAs:'finance',
        //resolve:{
        //  getFinances: getFinances
        //},
        authenticate: true
      });
  }

  //function getFinances(common) {
  //  var dataservice = common.dataservice;
  //  var me = common.Auth.getCurrentUser();
  //  return dataservice.getAllFinances(me)
  //}


}());
