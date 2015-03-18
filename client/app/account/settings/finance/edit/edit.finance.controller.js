(function () {
  "use strict";

  angular
    .module('app.account')
    .controller('EditFinanceCtrl', EditFinanceCtrl);

  EditFinanceCtrl.$inject = ['common', '$scope', '$stateParams', 'getFinance'];

  function EditFinanceCtrl(common, $scope, $stateParams, getFinance) {
    var vm = this;
    var dataservice = common.dataservice;
    var financeId = $stateParams.id;
    vm.tempFinance = getFinance;

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

    vm.saveFinance = function (input) {
      dataservice.editFinance(vm.me.id, financeId, input, function () {
        common.$state.go('^',{},{reload:true});
      })

    }


  }



}());
