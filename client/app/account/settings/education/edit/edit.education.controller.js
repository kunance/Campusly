(function () {
  "use strict";

  angular
    .module('app.account')
    .controller('EditEducationCtrl', EditEducationCtrl);

  EditEducationCtrl.$inject = ['common', '$scope', '$stateParams', 'getEducation'];

  function EditEducationCtrl(common, $scope, $stateParams, getEducation) {
    var vm = this;
    var dataservice = common.dataservice;
    var educationId = $stateParams.id;
    vm.tempEducation = getEducation;

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

  vm.saveEducation = function (input) {
    dataservice.editEducation(vm.me.id, educationId, input, function () {
      common.$state.go('^',{},{reload:true});
      console.log('Education updated');
    })

  }


  }



}());
