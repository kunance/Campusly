(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .controller('EditRoomCtrl',EditRoomCtrl);

  EditRoomCtrl.$inject = ['$scope', '$state', '$stateParams', 'logger', 'FileUploader', 'common','RoomListing', 'getAllUsers', 'getAllRoommates', 'currentUser'];

  function EditRoomCtrl($scope, $state, $stateParams, logger, FileUploader, common, RoomListing, getAllUsers, getAllRoommates, currentUser) {

    /* jshint validthis: true */
    var vm = this;
    vm.propertyImages = [];

    vm.me = currentUser;
    vm.ddlYesNoSelect = [{value: true, text: 'Yes'}, {value: false, text: 'No'}];
    vm.users = getAllUsers;
    vm.roommates = getAllRoommates;

    var roomId = $stateParams.id;
    logger.log('Room id: ', roomId);

    if(!roomId) {
      //TODO show error and/or  return to dashboard
    }
    else {
      RoomListing.get({userId: vm.me.id, id: roomId}).$promise.then(function (roomListing) {
        vm.room = roomListing;
        //console.log( angular.isDate(vm.room.availableMoveIn) );
        //console.log( angular.isString(vm.room.availableMoveIn) );
        //console.log(  vm.room.availableMoveIn.split('T', 1) );
        //vm.room.availableMoveIn =  vm.room.availableMoveIn.split('T', 1)[0]; //why are we doing this?
        //vm.room.leaseEndDate =  vm.room.leaseEndDate.split('T', 1)[0]; //why are we doing this?
        console.log('Room to edit: ', roomListing);
      }, function (errors) {
        //TODO need a general error handling banner or scheme to broadcast a message on
        console.log('error(s) while saving room listing', errors);
      });
    }

    vm.edit = function () {
      //console.log('Room from ctrl: ', vm.room);
      //   if(vm.room.$valid) {
      vm.room.creatorId = vm.me.id;
      RoomListing.edit( { userId: vm.me.id, id: roomId}, {room: vm.room}).$promise.then(function () {
        common.logger.success('New Room added.');
        $state.go('dashboard');
      }, function (errors) {
        //TODO need a general error handling banner or scheme to broadcast a message on
        console.log('error(s) while saving room listing', errors);
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
        console.log('error(s) while saving room listing', errors);
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
      console.log(file);
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
    $scope.format = 'dd.MM.yyyy';
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

    $scope.addNewRoommate = function(input){
      if(!input) { return false; }
      var roommate = input.originalObject;
      common.dataservice.addRoommate(vm.me.id, roommate).$promise
        .then(function (data) {
          common.logger.success('Roommate successfully added!');
          vm.roommates.push(data);
          vm.cancelRoommateAddAddon();
        })
        .catch(function (err) {
          common.logger.error('Something went wrong. Roommate not saved.');
        });
    };

    vm.removeRoommate= function (roommate) {
      var index= vm.roommates.indexOf(roommate);
      var id = roommate.id;
      common. dataservice.deleteRoommate(vm.me.id, id, function () {
        vm.roommates.splice(index, 1);
        common.logger.success('Successfully removed roommate');
      })
    };

    mixpanel.track('edit your room');

  }
}());


