(function () {
  "use strict";

  angular
    .module('app.account')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('settings.address', {
        url: '/address',
        templateUrl: 'app/account/settings/address/addresses.html',
        controller: 'AddressCtrl',
        controllerAs:'address',
        resolve:{
          getAddresses: getAddresses
        },
        authenticate: true
      });
  }

  function getAddresses(common) {
    var dataservice = common.dataservice;
    var me = common.Auth.getCurrentUser();
    return dataservice.getAllAddresses(me)
  }


}());
