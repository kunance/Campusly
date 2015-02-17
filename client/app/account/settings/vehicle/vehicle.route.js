(function () {
  "use strict";

  angular
    .module('app.account')
    .config(function($stateProvider) {
      $stateProvider
        .state('settings.vehicle', {
          url: '/vehicle',
          templateUrl: 'app/account/settings/vehicle/vehicles.html',
          controller: 'VehicleCtrl',
          controllerAs:'vehicle',
          resolve:{
            getVehicles: getVehicles
          },
          authenticate: true
        });
    });

  function getVehicles(common) {
    var dataservice = common.dataservice;
    var me = common.Auth.getCurrentUser();
    return dataservice.getAllVehicles(me)
  }

}());
