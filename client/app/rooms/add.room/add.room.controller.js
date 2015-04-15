(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .controller('AddNewRoomCtrl',AddNewRoomCtrl);

  AddNewRoomCtrl.$inject = ['$scope', 'common', 'data', 'RoomListing'];

  function AddNewRoomCtrl($scope, common, data, RoomListing) {

    /* jshint validthis: true */
    var vm = this;
    vm.errors = false;
    vm.universitiesList = data[0];
    vm.education = data[1];

    vm.room = {};
    vm.property = {};

    vm.me = common.Auth.getCurrentUser();

    vm.create = function (form) {
      vm.submitted = true;

      if(form.$valid) {
        vm.room.creatorId = vm.me.id;
        RoomListing.create( { userId: vm.me.id}, {room: vm.room, property: vm.property}).$promise.then(
          function (roomListing) {
            common.logger.success('Room saved');
            common.$state.go('roomDetail', { id: roomListing.id },{reload: true});
          }, function (errors) {
            common.logger.error('error while saving room listing');
            console.log('error(s) while saving room listing', errors);
          });
      } else {
        console.log(form);
        vm.errors = true;
      }

    };

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

    mixpanel.track('add a room');


  }

}());

