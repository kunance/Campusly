(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .controller('NewLookingCtrl', NewLookingCtrl);

  NewLookingCtrl.$inject = ['$scope', 'common'];

  function NewLookingCtrl($scope, common) {
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

vm.add= function (input) {
 dataservice.addLooking(vm.me.id, input).$promise
   .then(function () {
     common.logger.success('Looking successfully added.');
     common.$state.go('dashboard',{},{reload:true});
   })
   .catch(function (err) {
     common.logger.error('Error while saving looking.');
   });
}


  }

}());
