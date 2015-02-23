(function () {
  "use strict";

  angular
    .module('app.account')
    .controller('AddFinanceCtrl', AddFinanceCtrl);

  AddFinanceCtrl.$inject = ['$scope', 'common'];

  function AddFinanceCtrl($scope, common) {
    var vm = this;
    var dataservice = common.dataservice;
    var tempFinance = {};

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


    vm.addNewFinance = function (input) {
      dataservice.addFinance(vm.me.id, input).$promise
        .then(function () {
          common.logger.success('Finance successfully updated.');
          common.$state.go('^',{},{reload:true});
        })
        .catch(function (err) {
          common.logger.error('Error while saving finance.');
        });
    }

  }

}());
