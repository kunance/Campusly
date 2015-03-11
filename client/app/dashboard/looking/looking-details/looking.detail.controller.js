(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .controller('LookingDetailsCtrl', LookingDetailsCtrl);

  LookingDetailsCtrl.$inject = ['getEducations', '$stateParams', 'logger', 'getUserInfo', 'common', 'getLookingById'];

  function LookingDetailsCtrl(getEducations, $stateParams, logger, getUserInfo, common, getLookingById) {
    var vm = this;
    vm.me = getUserInfo;
    vm.tempMe = Object.create(vm.me);
    vm.education = getEducations;

    var lookingId = $stateParams.id;

    //if(lookingId) {
      vm.lookingDetail = getLookingById;
      //}

  }


}());
