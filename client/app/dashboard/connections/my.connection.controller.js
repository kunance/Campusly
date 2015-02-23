(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .controller('MyConnectionCtrl', MyConnectionCtrl);

  MyConnectionCtrl.$inject = ['common'];

  function MyConnectionCtrl(common) {
    var vm = this;
    vm.test = 'my connection ctrl';
  }

}());
