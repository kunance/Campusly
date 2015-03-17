(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .controller('EditLookingCtrl', EditLookingCtrl);

  EditLookingCtrl.$inject = ['$scope', 'common', 'getLooking', '$stateParams', 'currentUser'];

  function EditLookingCtrl($scope, common, getLooking, $stateParams, currentUser) {
    var vm = this;
    /*
     *  Fetch all required data for controller from route resolve
     */
      vm.me = currentUser;
      vm.tempLooking = getLooking;
      var lookingId = $stateParams.id;
    /*
     *  enables data binding to yes / no drop down values
     */
      vm.ddlYesNoSelect = [{value: true, text: 'Yes'}, {value: false, text: 'No'}];
    /*
     *  date pickers options
     */
      $scope.datePickers = {
        startDate: false,
        endDate:false
      };
      vm.address = {};
      $scope.format = 'MM/dd/yyyy';
      $scope.clear = function () {
        $scope.dt = null;
      };

      $scope.open = function($event, number) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.datePickers[number]= true;
      };
    /*
     *  manage with looking
     */
      vm.saveChanges = function (input) {
        common.dataservice.editLooking(vm.me.id, lookingId, input, function () {
          common.logger.success('Looking updated');
          common.$state.go('dashboard', {}, {reload: true});
        });
      };

    vm.deleteLooking = function () {
      common.dataservice.deleteLooking(vm.me.id, lookingId, function () {
        common.logger.success('Looking deleted');
        common.$state.go('dashboard', {}, {reload: true});
      })
    };

}

}());
