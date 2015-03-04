(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .controller('AroundCtrl', AroundCtrl);

  AroundCtrl.$inject = ['common'];

  function AroundCtrl(common) {
    var vm = this;
    vm.test = 'test around you ctrl';
  }

}());
