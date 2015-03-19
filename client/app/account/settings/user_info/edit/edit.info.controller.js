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
      vm.me.profileImage =res.saved;
    };

    vm.saveUserInfo= function (input) {
      input.profileImage=vm.me.profileImage;
      common.Auth.updateUser(input)
        .then(function () {
          common.$state.go('^',{},{reload:true});
        })
        .catch(function (err) {
        });
    };

  }

}());
