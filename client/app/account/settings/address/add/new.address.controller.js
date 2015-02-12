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
      dataservice.addAddress(vm.me.id, {
        streetNumeric: input.streetAddress.number,
        streetAddress: input.streetAddress.street,
        apt: input.streetAddress.apt,
        city:input.streetAddress.city,
        state:input.streetAddress.country_short,
        zip:input.streetAddress.zip,
        startDate:input.startDate,
        endDate:input.endDate,
        aboutMe:input.about,
        present:input.streetAddress.present
      }).$promise
        .then(function () {
          console.log('new Address added');
        })
        .catch(function (err) {
          console.log('error while creating new Address', err);
        });
    }

  }

}());
