(function () {
  "use strict";

  angular
    .module('app.account')
    .controller('NewAddressCtrl', NewAddressCtrl);

  NewAddressCtrl.$inject = ['$scope', 'common'];

  function NewAddressCtrl($scope, common) {
    var vm = this;
    var dataservice = common.dataservice;

    vm.me = common.Auth.getCurrentUser();

    $scope.datePickers = {
      startDate: false,
      endDate:false
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

    vm.addNewAddress= function (input) {
      var zip = input.zip.toString();
      var trimmedZip = zip.replace(/\s+/g, '');
      input.zip = Number(trimmedZip);
      dataservice.addAddress(vm.me.id, input).$promise
        .then(function () {
          common.logger.success('Address successfully added.');
          common.$state.go('^',{},{reload:true});
        })
        .catch(function (err) {
          common.logger.error('Error while saving address.');
        });
    }

  }

}());
