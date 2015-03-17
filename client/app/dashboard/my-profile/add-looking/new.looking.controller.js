(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .controller('NewLookingCtrl', NewLookingCtrl);

  NewLookingCtrl.$inject = ['$scope', 'common', 'currentUser'];

  function NewLookingCtrl($scope, common, currentUser) {
    var vm = this;

    vm.me = currentUser;

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

    vm.addLooking = function (input) {
      common.dataservice.addLooking(vm.me.id, input)
        .$promise
        .then(function () {
          common.logger.success('Looking successfully added.');
          common.$state.go('dashboard', {}, {reload: true});
        })
        .catch(function (err) {
          common.logger.error('Error while saving looking.');
        });
    };

  }

}());
