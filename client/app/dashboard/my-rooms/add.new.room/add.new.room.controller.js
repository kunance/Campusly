(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .controller('AddNewRoomCtrl',AddNewRoomCtrl);

  AddNewRoomCtrl.$inject = ['$scope','FileUploader', 'common', '$state', 'RoomListing'];

  function AddNewRoomCtrl($scope, FileUploader, common, $state, RoomListing) {

    /* jshint validthis: true */
    var vm = this;

    vm.room = {};
    vm.property = {};

    vm.me = common.Auth.getCurrentUser();
    vm.uploader = new FileUploader();
    vm.uploader.url = '/api/images';
    vm.uploader.onSuccessItem = function (itm,res,status,header) {
      vm.me.profileImage =res.saved;
    };

    vm.create = function () {

      //console.log('Room from ctrl: ', vm.room);
      //console.log('Property from ctrl: ', vm.property);


   //   if(vm.property.$valid && vm.room.$valid) {
        vm.room.creatorId = vm.me.id;

        RoomListing.create( { userId: vm.me.id}, {room: vm.room, property: vm.property}).$promise.then(function () {
          // $state.go('rooms');
        }, function (err) {
          console.log('error while saving property', err);
        });
    //  }

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

