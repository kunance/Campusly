(function () {
  "use strict";

  angular
    .module('app.account')
    .controller('OccupationCtrl', OccupationCtrl);

  OccupationCtrl.$inject = ['common', 'getOccupations'];

  function OccupationCtrl(common, getOccupations) {
    var vm = this;
    var dataservice = common.dataservice;
    vm.listOfOccupations = getOccupations;

    vm.me = common.Auth.getCurrentUser();

    vm.deleteOccupation= function (input) {
      var index= vm.listOfOccupations.indexOf(input);
      var id = input.id;
      dataservice.deleteOccupation(vm.me.id, id, function () {
        vm.listOfOccupations.splice(index, 1);
      });

    }
  }

}());
