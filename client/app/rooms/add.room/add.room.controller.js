(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .controller('AddNewRoomCtrl',AddNewRoomCtrl);

  AddNewRoomCtrl.$inject = ['$scope', 'common', '$state', 'RoomListing'];

  function AddNewRoomCtrl($scope, common, $state, RoomListing) {

    /* jshint validthis: true */
    var vm = this;

    vm.room = {};
    vm.property = {};

    vm.me = common.Auth.getCurrentUser();

    vm.create = function () {

      //console.log('Room from ctrl: ', vm.room);
      //console.log('Property from ctrl: ', vm.property);

   //   if(vm.property.$valid && vm.room.$valid) {
        vm.room.creatorId = vm.me.id;

        RoomListing.create( { userId: vm.me.id}, {room: vm.room, property: vm.property}).$promise.then(
          function (roomListing) {
            $state.go('editRoom', {id: roomListing.id});
          }, function (errors) {
            //TODO need a general error handling banner or scheme to broadcast a message on
            console.log('error(s) while saving room listing', errors);
          });
    //  }

    };

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

    mixpanel.track('add a room');


  }

}());

