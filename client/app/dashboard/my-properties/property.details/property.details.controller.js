(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .controller('PropertyDetailsCtrl',PropertyDetailsCtrl);

  PropertyDetailsCtrl.$inject = ['$scope', 'common'];

  function PropertyDetailsCtrl($scope, common) {
    var vm = this;
    var dataservice = common.dataservice;

  }

}());
