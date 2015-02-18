(function () {
  "use strict";

  angular
    .module('app.account')
    .controller('Step2Ctrl', Step2Ctrl);

  Step2Ctrl.$inject = ['common'];

  function Step2Ctrl(common) {
    var vm = this;

    //vm.me = getUserInfo;
    //vm.tempMe = Object.create(vm.me);

    vm.next = function () {
      common.$state.go('dashboard.myProfile.step3');
    };

    vm.previous= function () {
      common.$state.go('dashboard.myProfile.step1');
    }

  }

}());
