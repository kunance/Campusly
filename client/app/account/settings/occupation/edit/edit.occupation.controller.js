(function () {
  "use strict";

  angular
    .module('app.account')
    .controller('EditOccupationCtrl', EditOccupationCtrl);

  EditOccupationCtrl.$inject = ['common', '$scope', '$stateParams', 'getOccupation'];

  function EditOccupationCtrl(common, $scope, $stateParams, getOccupation) {
    var vm = this;
    var dataservice = common.dataservice;
    var occupationId = $stateParams.id;
    vm.tempOccupation = getOccupation;

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

    vm.saveOccupation = function (input) {
      dataservice.editOccupation(vm.me.id, occupationId, input, function () {
        common.$state.go('^',{},{reload:true});
      })

    }


  }



}());
