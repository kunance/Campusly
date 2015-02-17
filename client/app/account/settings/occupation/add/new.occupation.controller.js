(function () {
  "use strict";

  angular
    .module('app.account')
    .controller('AddOccupationCtrl', AddOccupationCtrl);

  AddOccupationCtrl.$inject = ['$scope', 'common'];

  function AddOccupationCtrl($scope, common) {
    var vm = this;
    var dataservice = common.dataservice;
    var tempOccupation = {};

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


    vm.addNewOccupation = function (input) {
      dataservice.addOccupation(vm.me.id, input).$promise
        .then(function () {
          console.log('new Occupation added');
          common.$state.go('^',{},{reload:true});
        })
        .catch(function (err) {
          console.log('error while creating new Occupation', err);
        });
    }

  }

}());
