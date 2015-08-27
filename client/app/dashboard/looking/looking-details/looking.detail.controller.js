(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .controller('LookingDetailsCtrl', LookingDetailsCtrl);

  LookingDetailsCtrl.$inject = ['common', 'getLookingById', 'currentUser', '$rootScope', '$stateParams', '$state', 'ngDialog', '$scope'];

  function LookingDetailsCtrl(common, getLookingById, currentUser, $rootScope, $stateParams, $state, ngDialog, $scope) {
    var vm = this;
    /*
     *  Fetch all required data for controller from route resolve
     */
    vm.me = currentUser;
    vm.tempMe = Object.create(vm.me);
    vm.lookingDetail = getLookingById[0];
    mixpanel.track("looking detail");
    mixpanel.people.increment('looking detail');

    vm.allIds = ($stateParams.allIds).split(",").map(Number);
    var id = $stateParams.param;
    $rootScope.currentRoom =  vm.allIds.indexOf(+id);
    vm.next = function () {
      $rootScope.currentRoom += 1;
      $state.go('lookingDetail',{param:vm.allIds[$rootScope.currentRoom], allIds:vm.allIds});
    };

    vm.previous = function () {
      $rootScope.currentRoom -= 1;
      $state.go('lookingDetail',{param:vm.allIds[$rootScope.currentRoom], allIds:vm.allIds});
    };

    /*
     *  ngDialog
     */
    $scope.open = function (emailAddress, firstname, lastname) {
      ngDialog.open({
        template: 'aroundYouMessage',
        controller: 'ngDialogCtrl',
        data: {
          email: emailAddress,
          firstName: firstname,
          lastName: lastname}
      });
    };

  }
}());
