(function() {

  "use strict";

  angular
    .module('app.dashboard')
    .controller('DashboardCtrl',DashboardCtrl);

  DashboardCtrl.$inject=['common'];

  function DashboardCtrl(common) {
    var vm = this;
    var Auth = common.Auth;

    vm.test = 'hello world!';
  }

}());
