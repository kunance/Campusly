(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .controller('MyPropertiesCtrl', MyPropertiesCtrl);

  MyPropertiesCtrl.$inject = ['$scope', 'common', 'FileUploader'];

  function MyPropertiesCtrl($scope, common, FileUploader) {
    var vm = this;
    vm.property = {};
    vm.me = common.Auth.getCurrentUser();

    vm.uploader = new FileUploader();
    vm.uploader.url = '/api/properties/:id/images';
    vm.uploader.onSuccessItem = function (itm,res,status,header) {
      vm.me.userImage =res.saved;
    };



  }


}());
