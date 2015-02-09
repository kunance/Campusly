(function () {
  "use strict";

  angular
    .module('app.account')
    .controller('UserInfoCtrl', UserInfoController);

  UserInfoController.$inject = ['$scope', 'common', 'UserResource','Auth'];

  function UserInfoController($scope, common, UserResource,Auth) {
    var vm = this;
    vm.me = common.Auth.getCurrentUser();

vm.saveUserInfo= function () {
  vm.tempMe =  Object.create(vm.me);
  Auth.updateUser({

  })
    .then(function () {
      console.log('updated');
      $state.go('main');
    })
    .catch(function (err) {
      console.log('error', err);
    });
};




  }


}());
