(function () {
  "use strict";

  angular
    .module('app.account')
    .controller('VehicleCtrl', VehicleCtrl);

  VehicleCtrl.$inject = ['$scope', 'getVehicles', 'common'];

  function VehicleCtrl($scope, getVehicles, common) {
    var vm = this;
    var dataservice = common.dataservice;
    vm.listOfVehicles = getVehicles;

    vm.me = common.Auth.getCurrentUser();

    vm.deleteVehicle= function (input) {
      var index= vm.listOfVehicles.indexOf(input);
      var id = input.id;
      dataservice.deleteVehicle(vm.me.id, id, function () {
        vm.listOfVehicles.splice(index, 1);
      });

    }
  }

}());
