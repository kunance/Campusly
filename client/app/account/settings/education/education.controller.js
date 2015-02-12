(function () {
  "use strict";

  angular
    .module('app.account')
    .controller('EducationCtrl', EducationCtrl);

  EducationCtrl.$inject = ['$scope', 'common', 'getEducations'];

  function EducationCtrl($scope, common, getEducations) {
    var vm = this;
    vm.listOfEducations = getEducations;


  }

}());
