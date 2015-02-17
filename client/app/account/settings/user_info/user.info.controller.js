(function () {
  "use strict";

  angular
    .module('app.account')
    .controller('UserInfoController', UserInfoController);

  UserInfoController.$inject = ['$scope', 'common', 'FileUploader'];

  function UserInfoController($scope, common, FileUploader) {
    var vm = this;
    vm.me = common.Auth.getCurrentUser();
    vm.tempMe =  Object.create(vm.me);
    vm.uploader = new FileUploader();
    vm.uploader.url = '/api/images';
    vm.uploader.onSuccessItem = function (itm,res,status,header) {
      vm.me.userImage =res.saved;
    };

vm.saveUserInfo= function (input) {
  input.userImage=vm.me.userImage;
  common.Auth.updateUser(input)
    .then(function () {
      console.log('User info updated');
    })
    .catch(function (err) {
      console.log('error while updating user info', err);
    });
};
  }

}());
