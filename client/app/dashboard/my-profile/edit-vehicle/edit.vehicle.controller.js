(function () {
  "use strict";

  angular
    .module('app.dashboard')
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

    vm.delete= function () {
      dataservice.deleteVehicle(vm.me.id, vehicleId, function () {
        common.logger.success('Vehicle deleted');
        common.$state.go('^',{},{reload:true});
      });
    }

    vm.aaa= function () {
     alert('aaa')
    }

    vm.saveVehicle = function (input) {
      dataservice.editVehicle(vm.me.id, vehicleId, input, function () {
        console.log('Vehicle updated');
        common.$state.go('^',{},{reload:true});
      })
    };

}

}());
