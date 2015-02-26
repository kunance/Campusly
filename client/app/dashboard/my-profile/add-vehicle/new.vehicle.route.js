(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .config(function($stateProvider) {
      $stateProvider
        .state('dashboard.myProfile.addVehicle', {
          url: '/addVehicle',
          templateUrl: 'app/dashboard/my-profile/add-vehicle/new.vehicle.html',
          controller: 'NewVehicleCtrl',
          controllerAs:'newVehicle',
          authenticate: true
        });
    });

}());
