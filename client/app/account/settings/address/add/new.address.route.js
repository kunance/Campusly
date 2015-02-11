(function () {
  "use strict";

  angular
    .module('app.account')
    .config(function($stateProvider) {
      $stateProvider
        .state('settings.address.new', {
          url: '/new',
          templateUrl: 'app/account/settings/address/add/new.address.html',
          controller: 'NewAddressCtrl',
          controllerAs:'newAddress',
          authenticate: true
        });
    });

}());
