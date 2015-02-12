(function () {
  "use strict";

  angular
    .module('app.account')
    .config(function($stateProvider) {
      $stateProvider
        .state('settings.address', {
          url: '/address',
          templateUrl: 'app/account/settings/address/addresses.html',
          controller: 'AddressCtrl',
          controllerAs:'address',
          authenticate: true
        });
    });

}());
