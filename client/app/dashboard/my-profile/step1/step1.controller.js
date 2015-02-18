(function () {
  "use strict";

  angular
    .module('app.account')
    .controller('Step1Ctrl', Step1Ctrl);

  Step1Ctrl.$inject = ['common', 'getUserInfo', 'FileUploader'];

  function Step1Ctrl(common, getUserInfo, FileUploader) {
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

    vm.next = function () {
      common.$state.go('dashboard.myProfile.step2');
    };




  }

}());
