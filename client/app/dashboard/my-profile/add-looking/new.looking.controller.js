(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .controller('NewLookingCtrl', NewLookingCtrl);

  NewLookingCtrl.$inject = ['$scope', 'common', 'currentUser'];

  function NewLookingCtrl($scope, common, currentUser) {
    var vm = this;

    vm.me = currentUser;
    vm.errors = false;

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

    vm.addLooking = function (input, form) {
      vm.submitted = true;
      if (form.$valid) {
      common.dataservice.addLooking(vm.me.id, input)
        .$promise
        .then(function (looking) {
          common.logger.success('Looking successfully added.');
          common.$state.go('lookingDetail', {id: looking.id}, {reload: true});
        })
        .catch(function (err) {
          common.logger.error('Error while saving looking.');
        });
      } else {
        console.log(form);
        vm.errors = true;
      }
    };

    mixpanel.track('add a looking');

  }

}());
