(function () {
  "use strict";

  angular
  .module('app.dashboard')
  .controller('LookingCtrl', LookingCtrl);

  LookingCtrl.$inject = ['common', 'allLooking', 'currentUser'];

  function LookingCtrl(common, allLooking, currentUser) {
    var vm = this;

    vm.me = currentUser;
    vm.lookings = allLooking;
    console.log(vm.lookings);
    vm.groups = vm.lookings.inGroupsOf(8);
    console.log(vm.groups);

  }

}());
