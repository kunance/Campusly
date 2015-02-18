(function () {
  "use strict";

  angular
    .module('app.account')
    .controller('Step3Ctrl', Step3Ctrl);

  Step3Ctrl.$inject = ['common', 'FileUploader'];

  function Step3Ctrl(common, FileUploader) {
    var vm = this;
    //vm.me = getUserInfo;
    //vm.tempMe = Object.create(vm.me);

    vm.previous= function () {
      common.$state.go('dashboard.myProfile.step2');
    }



  }

}());
