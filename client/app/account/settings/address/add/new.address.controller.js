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
      input.zip = input.zip.replace(/\s/g, '');
      dataservice.addAddress(vm.me.id, input).$promise
        .then(function () {
          console.log('new Address added');
          common.$state.go('^',{},{reload:true});
        })
        .catch(function (err) {
          console.log('error while creating new Address', err);
        });
    }

  }

}());
