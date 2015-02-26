(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('dashboard.myProfile.editVehicle', {
        url: '/editVehicle/:id',
        templateUrl: 'app/dashboard/my-profile/edit-vehicle/edit.vehicle.html',
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
