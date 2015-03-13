(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .controller('LookingDetailsCtrl', LookingDetailsCtrl);

  LookingDetailsCtrl.$inject = ['getEducations', 'common', 'getLookingById', 'currentUser'];

  function LookingDetailsCtrl(getEducations, common, getLookingById, currentUser) {
    var vm = this;
    /*
     *  Fetch all required data for controller from route resolve
     */
    vm.me = currentUser;
    vm.tempMe = Object.create(vm.me);
    vm.education = getEducations;
    vm.lookingDetail = getLookingById;

    //console.log('Looking Detail: ', vm.lookingDetail);


  }


}());
