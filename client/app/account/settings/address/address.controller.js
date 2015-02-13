(function () {
  "use strict";

  angular
    .module('app.account')
    .controller('AddressCtrl', AddressCtrl);

  AddressCtrl.$inject = ['common', '$scope', '$stateParams', 'getAddresses'];

  function AddressCtrl(common, $scope, $stateParams, getAddresses) {
    var vm = this;
    var dataservice = common.dataservice;
    vm.listOfAddresses = getAddresses;

    vm.me = common.Auth.getCurrentUser();

    vm.deleteAddress= function (input) {
      var index= vm.listOfAddresses.indexOf(input);
      var id = input.id;
      dataservice.deleteAddress(vm.me.id, id, function () {
        vm.listOfAddresses.splice(index, 1);
      });

    }

  }



}());
