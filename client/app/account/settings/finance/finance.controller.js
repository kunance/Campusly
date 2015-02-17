(function () {
  "use strict";

  angular
    .module('app.account')
    .controller('FinanceCtrl', FinanceCtrl);

  FinanceCtrl.$inject = ['common', 'getFinances'];

  function FinanceCtrl(common, getFinances) {
    var vm = this;
    var dataservice = common.dataservice;
    vm.listOfFinances = getFinances;

    vm.me = common.Auth.getCurrentUser();

    vm.deleteFinance= function (input) {
      var index= vm.listOfFinances.indexOf(input);
      var id = input.id;
      dataservice.deleteFinance(vm.me.id, id, function () {
        vm.listOfFinances.splice(index, 1);
      });

    }
  }

}());
