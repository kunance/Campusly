(function () {
  "use strict";

  angular
    .module('app.account')
    .controller('EducationCtrl', EducationCtrl);

  EducationCtrl.$inject = ['$scope', 'common', 'getEducations'];

  function EducationCtrl($scope, common, getEducations) {
    var vm = this;
    var dataservice = common.dataservice;
    vm.listOfEducations = getEducations;

    vm.me = common.Auth.getCurrentUser();

    vm.deleteEducation= function (input) {
      var index= vm.listOfEducations.indexOf(input);
      var id = input.id;
      dataservice.deleteEducation(vm.me.id, id, function () {
        vm.listOfEducations.splice(index, 1);
      });

    }

  }

}());
