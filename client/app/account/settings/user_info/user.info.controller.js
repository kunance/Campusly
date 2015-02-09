(function () {
  "use strict";

  angular
    .module('app.account')
    .controller('UserInfoCtrl', UserInfoController);

  UserInfoController.$inject = ['$scope', 'common'];

  function UserInfoController($scope, common) {
    var vm = this;
    vm.me = common.Auth.getCurrentUser();
    vm.tempMe =  Object.create(vm.me);

vm.saveUserInfo= function (input) {
  common.Auth.updateUser({
    firstname:input.firstname,
    lastname:input.lastname,
    middlename:input.middlename,
    username:input.username,
    phone:input.phone,
    email:input.email
  })
    .then(function () {
      console.log('updated');
    })
    .catch(function (err) {
      console.log('error', err);
    });
};
  }


}());
