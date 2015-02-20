(function () {
  "use strict";

  angular
    .module('app.account')
    .controller('Step2Ctrl', Step2Ctrl);

  Step2Ctrl.$inject = ['common', 'getPets', 'getAddresses'];

  function Step2Ctrl(common, getPets, getAddresses) {
    var vm = this;
    vm.pets = getPets;
    vm.priorAddresses = getAddresses;
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
