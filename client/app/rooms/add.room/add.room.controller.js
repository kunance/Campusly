(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .controller('AddNewRoomCtrl',AddNewRoomCtrl);

  AddNewRoomCtrl.$inject = ['$scope', 'common', 'data', 'RoomListing', 'currentUser'];

  function AddNewRoomCtrl($scope, common, data, RoomListing, currentUser) {

    /* jshint validthis: true */
    var vm = this;
    vm.me = currentUser;
    vm.universitiesList = data[0];
    vm.education = data[1];
    vm.errors = false;

    vm.room = {};
    vm.property = {};

    vm.create = function (form, education) {
      vm.submitted = true;

      if(form.$valid) {
        vm.room.creatorId = vm.me.id;
        RoomListing.create( { userId: vm.me.id}, {room: vm.room, property: vm.property}).$promise.then(
          function (roomListing) {
            var educationInput = {};
            educationInput.universityId = education.educationCenterName.id;
            educationInput.educationCenterName = education.educationCenterName.name;
            common.dataservice.addEducation(vm.me.id, educationInput)
              .$promise
              .then(function () {
                common.logger.success('Room saved');
                common.$state.go('roomDetail', { id: roomListing.id },{reload: true});
              })
              .catch(function (err) {
                common.logger.error('Error while saving education.',err);
              });
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

