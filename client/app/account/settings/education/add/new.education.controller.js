(function () {
  "use strict";

  angular
    .module('app.account')
    .controller('AddEducationCtrl', AddEducationCtrl);

  AddEducationCtrl.$inject = ['$scope', 'common'];

  function AddEducationCtrl($scope, common) {
    var vm = this;
    var dataservice = common.dataservice;
    var tempEducation = {};

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


    vm.addNewEducation = function (input) {
      dataservice.addEducation(vm.me.id, {
          educationCenterName: input.educationCenterName,
          type: input.type,
          startDate: input.startDate,
          endDate:input.endDate,
          graduation:input.graduation,
          graduationDate:input.graduationDate,
          major:input.major,
          degreeType:input.degreeType
      }).$promise
        .then(function () {
          console.log('new Education added');
          common.$state.go('^',{},{reload:true});
        })
        .catch(function (err) {
          console.log('error while creating new Education', err);
        });
    }

  }

}());
