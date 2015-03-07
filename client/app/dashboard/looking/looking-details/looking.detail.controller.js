(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .controller('LookingDetailCtrl', LookingDetailCtrl);

  LookingDetailCtrl.$inject = ['$scope', '$stateParams', 'logger', 'Auth', 'common', 'getLookingById'];

  function LookingDetailCtrl($scope, $stateParams, logger, Auth, common, getLookingById) {
    var vm = this;
    vm.me = Auth.getCurrentUser();

    var lookingId = $stateParams.id;

    if(lookingId) {
      vm.lookingDetail = getLookingById;
      }

    console.log(vm.lookingDetail);

  }
}());

