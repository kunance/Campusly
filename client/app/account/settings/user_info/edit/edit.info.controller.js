(function () {
  "use strict";

  angular
    .module('app.account')
    .controller('EditInfoCtrl', EditInfoCtrl);

  EditInfoCtrl.$inject = ['common', 'getUserInfo', 'FileUploader'];

  function EditInfoCtrl(common, getUserInfo, FileUploader) {
    var vm = this;
    vm.me = getUserInfo;
    vm.tempMe = Object.create(vm.me);

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
          common.$state.go('^',{},{reload:true});
        })
        .catch(function (err) {
          console.log('error while updating user info', err);
        });
    };

  }

}());
