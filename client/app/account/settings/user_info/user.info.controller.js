(function () {
  "use strict";

  angular
    .module('app.account')
    .controller('UserInfoController', UserInfoController);

  UserInfoController.$inject = ['$scope', 'common', 'getUser'];

  function UserInfoController($scope, common, getUser) {
    var vm = this;
    vm.me = getUser;
  }

}());
