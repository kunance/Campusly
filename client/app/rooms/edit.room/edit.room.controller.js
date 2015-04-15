(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .controller('EditRoomCtrl',EditRoomCtrl);

  EditRoomCtrl.$inject = ['$scope', '$state', '$stateParams', 'logger', 'FileUploader', 'common','RoomListing', 'data', 'currentUser'];

  function EditRoomCtrl($scope, $state, $stateParams, logger, FileUploader, common, RoomListing, data,  currentUser) {

    /* jshint validthis: true */
    var vm = this;
    vm.propertyImages = [];

    vm.me = currentUser;
    vm.users = data[0];
    vm.roommates = data[1];
    vm.room = data[2];
    vm.ddlYesNoSelect = [{value: true, text: 'Yes'}, {value: false, text: 'No'}];
    vm.universitiesList = data[3];
    vm.education = data[4];

    var roomId = $stateParams.id;
    logger.log('Room id: ', roomId);


    vm.edit = function () {
      //   if(vm.room.$valid) {
      vm.room.creatorId = vm.me.id;
      RoomListing.edit( { userId: vm.me.id, id: roomId}, {room: vm.room}).$promise.then(function () {
        common.logger.success('New Room added.');
        $state.go('dashboard');
      }, function (errors) {
        //TODO need a general error handling banner or scheme to broadcast a message on
      });
      //  }
    };

    vm.deleteRoom = function () {
      var input = {activeRoom: false};
      RoomListing.edit( { userId: vm.me.id, id: roomId}, {room: input}).$promise.then(function () {
        common.logger.success('Room deleted.');
        $state.go('dashboard');
      }, function (errors) {
        //TODO need a general error handling banner or scheme to broadcast a message on
      });
    };

    vm.uploader = new FileUploader();
    vm.uploader.url = '/api/images';
    vm.uploader.onSuccessItem = function (itm,res,status,header) {
      vm.me.profileImage =res.saved;
    };

    vm.data = {
      url:'/api/images',
      successCallback: successCallback,
      errorCallback: errorCallback
    };

    function successCallback(file, resp) {
      common.logger.success('Image '+file._file.name+' uploaded');
    }
    function errorCallback(file) {
      common.logger.error('Error while uploading '+file._file.name+' image');
    }

    $scope.datePickers = {
      startDate: false,
      endDate:false
    };
    vm.address = {};
    $scope.format = 'MM/dd/yyyy';
    $scope.clear = function () {
      $scope.dt = null;
    };

    $scope.open = function($event, number) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.datePickers[number]= true;
    };

    vm.showNewRoomate = false;
    vm.showRoommatesAddonButtons = false;

    vm.toggleAddRoommate = function(){
      vm.showAddRoommate = true;
      vm.showInviteRoomate = false;
      vm.showRoommatesAddonButtons = true;
    };

    vm.toggleInviteRoomate = function(){
      vm.showAddRoommate = false;
      vm.showInviteRoomate = true;
      vm.showRoommatesAddonButtons = true;
    };

    vm.toggleRoommatesAddon = function(){
      vm.showRoommatesAddonButtons = !vm.showRoommatesAddonButtons;
      vm.showAddRoommate = false;
      vm.showInviteRoomate = false;
    };

    vm.cancelRoommateAddAddon = function (){
      vm.showRoommateAddonButtons = false;
      vm.showAddRoommate = false;
      vm.showInviteRoommate = false;
    };

    vm.cancelRoommateInviteAddon = function (){
      vm.showRoommateAddonButtons = false;
      vm.showAddRoommate = false;
      vm.showInviteRoomate = false;
    };

    vm.removeRoommate= function (roommate) {
      var index= vm.roommates.indexOf(roommate);
      var id = roommate.id;
      common. dataservice.deleteRoommate(vm.me.id, id, function () {
        vm.roommates.splice(index, 1);
        common.logger.success('Successfully removed roommate');
      })
    };

   $scope.addNewRoommate = function(input){
      if(!input) { return false; }
      input.originalObject.roommateId = input.originalObject.id;
      var roommate = input.originalObject;
      common.dataservice.addRoommate(vm.me.id, roommate)
        .$promise
        .then(function (data) {
          common.logger.success('Roommate successfully added!');
          common.$state.reload();
          vm.roommates.push(data);
        })
        .catch(function (err) {
          common.logger.error('Something went wrong. Roommate not saved.');
        });
    };

    mixpanel.track('edit your room');

  }
}());


