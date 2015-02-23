
(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .config(function($stateProvider) {
      $stateProvider
        .state('dashboard.myProfile.addNewAddress', {
          url: '/addNewAddress',
          templateUrl: 'app/dashboard/my-profile/add-address/new.address.html',
          controller: 'NewAddressCtrl',
          controllerAs:'newAddress',
          authenticate: true
        });
    });

}());
