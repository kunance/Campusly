(function () {
  "use strict";

  angular
  .module('app.dashboard')
  .controller('LookingCtrl', LookingCtrl);

  LookingCtrl.$inject = ['common', 'allLooking'];

  function LookingCtrl(common, allLooking) {
    var vm = this;
    vm.me = common.Auth.getCurrentUser();

    vm.lookings = allLooking;
    console.log(vm.lookings);
  }

}());
