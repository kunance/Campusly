(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .controller('LookingDetailsCtrl', LookingDetailsCtrl);

  LookingDetailsCtrl.$inject = ['common', 'getLookingById', 'currentUser'];

  function LookingDetailsCtrl(common, getLookingById, currentUser) {
    var vm = this;
    /*
     *  Fetch all required data for controller from route resolve
     */
    vm.me = currentUser;
    vm.tempMe = Object.create(vm.me);
    vm.lookingDetail = getLookingById[0];
    mixpanel.track('looking detail');

  }

}());
