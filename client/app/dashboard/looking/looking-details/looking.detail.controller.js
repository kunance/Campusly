(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .controller('LookingDetailCtrl', LookingDetailCtrl);

  LookingDetailCtrl.$inject = ['getEducations', '$stateParams', 'logger', 'getUserInfo', 'common', 'getLookingById'];

  function LookingDetailCtrl(getEducations, $stateParams, logger, getUserInfo, common, getLookingById) {
    var vm = this;
    vm.me = getUserInfo;
    vm.tempMe = Object.create(vm.me);
    vm.education = getEducations;

    var lookingId = $stateParams.id;

    if(lookingId) {
      vm.lookingDetail = getLookingById;
      }

    console.log(vm.lookingDetail);

  }
}());

