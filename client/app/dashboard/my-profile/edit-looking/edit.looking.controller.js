(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .controller('EditLookingCtrl', EditLookingCtrl);

  EditLookingCtrl.$inject = ['$scope', 'common', 'getLooking', '$stateParams'];

  function EditLookingCtrl($scope, common, getLooking, $stateParams) {
    var vm = this;

    if($stateParams.id){
      var dataservice = common.dataservice;
      vm.tempLooking = getLooking;
      var lookingId = $stateParams.id;
      console.log(vm.tempLooking);

      vm.me = common.Auth.getCurrentUser();

      vm.ddlYesNoSelect = [{value: true, text: 'Yes'}, {value: false, text: 'No'}];

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

      vm.saveChanges= function (input) {
        dataservice.editLooking(vm.me.id, lookingId, input, function () {
          common.logger.success('Looking updated');
          common.$state.go('dashboard', {}, {reload: true});
        })
      }

      vm.delete= function () {
        dataservice.deleteLooking(vm.me.id, lookingId, function () {
          common.logger.success('Looking deleted');
          common.$state.go('dashboard',{},{reload:true});
        })
      }
    }

}

}());
