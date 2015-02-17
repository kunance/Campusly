(function () {
  "use strict";

  angular
    .module('app.account')
    .controller('EditAddressCtrl', EditAddressCtrl);

  EditAddressCtrl.$inject = ['common', '$scope', 'getAddress', '$stateParams'];

  function EditAddressCtrl(common, $scope, getAddress, $stateParams) {
    var vm = this;
    var dataservice = common.dataservice;
    var addressesId = $stateParams.id;
    vm.tempAddress = getAddress;

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

    vm.saveAddress = function (input) {
      input.zip = input.zip.replace(/\s/g, '');
      dataservice.editAddress(vm.me.id, addressesId, input, function () {
        common.$state.go('^',{},{reload:true});
        console.log('Address updated');
      })

    }



  }

}());
