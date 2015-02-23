(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .controller('AddNewPropertyCtrl',AddNewPropertyCtrl);

  AddNewPropertyCtrl.$inject = ['$scope','FileUploader', 'common', '$state'];

  function AddNewPropertyCtrl($scope, FileUploader, common, $state) {
    var vm = this;
    var dataservice = common.dataservice;
    vm.me = common.Auth.getCurrentUser();
    vm.uploader = new FileUploader();
    vm.uploader.url = '/api/images';
    vm.uploader.onSuccessItem = function (itm,res,status,header) {
      vm.me.profileImage =res.saved;
    };

    vm.addNewProperty= function (input) {
      var zip = input.zip.toString();
      var trimmedZip = zip.replace(/\s+/g, '');
      input.zip = Number(trimmedZip);
      input.latitude= input.location.latitude;
      input.longitude= input.location.longitude;
      input.userId = vm.me.id;
      dataservice.addProperty(input).$promise.then(function () {
        //$state.go('myProperties')
      }, function (err) {
          console.log('error while saving property', err);
        });

    }

    vm.data = {
      url:'/api/images',
      successCallback: successCallback,
      errorCallback: errorCallback
    };

    function successCallback(file, resp) {
      console.log(file);
      common.logger.success('Image '+file._file.name+' uploaded');
    }

    function errorCallback() {
      common.logger.error('Error while uploading '+file._file.name+' image');
    }

  }

}());
