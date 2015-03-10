(function () {
  "use strict";

  angular
  .module('app.dashboard')
  .controller('LookingCtrl', LookingCtrl);

  LookingCtrl.$inject = ['common', 'allLooking'];

  function LookingCtrl(common, allLooking) {

    var vm = this;
    vm.lookings = allLooking;

  }

}());
