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
      var trimmedZip = input.streetAddress.zip.replace(/\s/g, '');
      dataservice.addProperty({
        streetAddress: input.streetAddress.street,
        latitude: input.streetAddress.location.latitude,
        longitude: input.streetAddress.location.longitude,
        streetNumeric: input.streetAddress.number,
        city: input.streetAddress.city,
        state: input.streetAddress.country_short,
        zip: trimmedZip,
        createdAt: new Date(),
        apt:input.apt,
        bldg:input.bldg,
        type:input.type,
        description:input.description,
        bedrooms:input.bedrooms,
        bathrooms:input.bathrooms,
        parkingSpots:input.parkingSpots,
        livingAreaSqFt:input.livingAreaSqFt,
        hoaFee:input.hoaFee,
        otherFee:input.otherFee,
        status:input.status
      }).$promise.then(function () {
        $state.go('myProperties')
      }, function (err) {
          console.log('error while saving property', err);
        });

    }
  }

}());
