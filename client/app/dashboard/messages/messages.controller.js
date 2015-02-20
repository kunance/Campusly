(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .controller('MyMessagesCtrl', MyMessagesCtrl);

  MyMessagesCtrl.$inject = ['common'];

  function MyMessagesCtrl(common) {
    var vm = this;
    vm.test = 'my messages';
  }

}());
