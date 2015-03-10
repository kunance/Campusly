(function () {
  "use strict";

  angular
    .module('RentedApp')
    .controller('SubNavbarCtrl', SubNavbarCtrl);

  SubNavbarCtrl.$inject = ['$scope'];

  function SubNavbarCtrl($scope) {
    var vm = this;

    vm.tabs = [
      { title:"Dashboard", sref:"dashboard", active: true },
      { title:"Available rooms", sref:"rooms"},
      { title:"Looking", sref:"dashboard.looking"}];
  }


}());

