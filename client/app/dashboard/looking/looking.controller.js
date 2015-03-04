(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .controller('LookingCtrl', LookingCtrl);

  LookingCtrl.$inject = ['common'];

  function LookingCtrl(common) {
    var vm = this;
    vm.test = 'test looking ctrl';
  }

}());
