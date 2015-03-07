(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .controller('AddNewRoomCtrl',AddNewRoomCtrl);

  AddNewRoomCtrl.$inject = ['$scope','FileUploader', 'common', '$state'];

  function AddNewRoomCtrl($scope, FileUploader, common, $state) {

    /* jshint validthis: true */
    var vm = this;

    var dataservice = common.dataservice;


    vm.room = {};
    vm.property = {};

    vm.me = common.Auth.getCurrentUser();
    vm.uploader = new FileUploader();
    vm.uploader.url = '/api/images';
    vm.uploader.onSuccessItem = function (itm,res,status,header) {
      vm.me.profileImage =res.saved;
    };

    vm.create = function (property, room, picture) {
      var zip = property.address.zip.toString();
      var trimmedZip = zip.replace(/\s+/g, '');
      property.address.zip = Number(trimmedZip);
      property.coords.latitude = property.location.latitude;
      property.coords.longitude = property.location.longitude;
      room.creatorId = vm.me.id;

      dataservice.addRoomListing(vm.me.id, { room : room, property: property}).$promise.then(function () {
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

