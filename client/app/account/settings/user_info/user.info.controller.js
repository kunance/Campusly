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
  common.Auth.updateUser({
    userImage: vm.me.userImage,
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
