(function () {
  "use strict";

  angular
    .module('app.account')
    .controller('EditVehicleCtrl', EditVehicleCtrl);

  EditVehicleCtrl.$inject = ['common', '$scope', '$stateParams', 'getVehicle'];

  function EditVehicleCtrl(common, $scope, $stateParams, getVehicle) {
    var vm = this;
    var dataservice = common.dataservice;
    var vehicleId = $stateParams.id;
    vm.tempVehicle = getVehicle;

    vm.me = common.Auth.getCurrentUser();

    $scope.datePickers = {
      startDate: false,
      endDate:false,
      graduationDate:false
    };
    vm.address = {};
    $scope.format = 'dd.MM.yyyy';
    $scope.clear = function () {
      $scope.dt = null;
    };

    $scope.open = function($event, number) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.datePickers[number]= true;
    };

    vm.saveVehicle = function (input) {
      dataservice.editVehicle(vm.me.id, vehicleId, input, function () {
        common.$state.go('^',{},{reload:true});
        console.log('Vehicle updated');
      })
    }
  }



}());
