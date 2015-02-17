(function () {
  "use strict";

  angular
    .module('app.account')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('settings.vehicle.edit', {
        url: '/edit/:id',
        templateUrl: 'app/account/settings/vehicle/edit/edit.vehicle.html',
        controller: 'EditVehicleCtrl',
        controllerAs:'editVehicle',
        resolve:{
          getVehicle: getVehicle
        },
        authenticate: true
      });
  }

  function getVehicle(common, $stateParams) {
    var vehicleId = $stateParams.id;
    var dataservice = common.dataservice;
    var me = common.Auth.getCurrentUser();
    return dataservice.getVehicle(me, vehicleId);
  }

}());
