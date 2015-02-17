(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .controller('AddNewPropertyCtrl',AddNewPropertyCtrl);

  AddNewPropertyCtrl.$inject = ['$scope','FileUploader', 'common', '$state'];

  function AddNewPropertyCtrl($scope, FileUploader, common, $state) {
    var vm = this;
    var dataservice = common.dataservice;

    vm.uploader = new FileUploader();
    vm.uploader.url = '/api/images';
    vm.uploader.onSuccessItem = function (itm,res,status,header) {
      vm.me.userImage =res.saved;
    };

    vm.addNewProperty= function (input) {
      var zip = input.zip.toString();
      var trimmedZip = zip.replace(/\s+/g, '');
      input.zip = Number(trimmedZip);
      input.latitude= input.location.latitude;
      input.longitude= input.location.longitude;
      dataservice.addProperty(input).$promise.then(function () {
        $state.go('myProperties')
      }, function (err) {
          console.log('error while saving property', err);
        });

    }
  }

}());
