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
      var trimmedZip = input.zip.replace(/\s/g, '');
      dataservice.addProperty({
        streetAddress: input.street,
        latitude: input.location.latitude,
        longitude: input.location.longitude,
        streetNumeric: input.number,
        city: input.city,
        state: input.country_short,
        zip: trimmedZip,
        createdAt: new Date()
      }).$promise.then(function () {
        $state.go('myProperties')
      }, function (err) {
          console.log('error while saving property', err);
        });

    }
  }

}());
