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

    if(vm.education.educationCenterName){
      var EducationStatus = vm.education.educationCenterName;
      var educationId = vm.education.id;
    }

    vm.room = {};
    vm.property = {};

    vm.create = function (form, education) {
      vm.submitted = true;

      if(form.$valid) {
        vm.room.creatorId = vm.me.id;
        RoomListing.create( { userId: vm.me.id}, {room: vm.room, property: vm.property}).$promise.then(
          function (roomListing) {
            if(!educationId) {
              var educationInput = {};
              educationInput.universityId = education.educationCenterName.id;
              educationInput.educationCenterName = education.educationCenterName.name;
              common.dataservice.addEducation(vm.me.id, educationInput)
                .$promise
                .then(function () {
                })
                .catch(function (err) {
                  common.logger.error('Error while saving education.', err);
                });
            }
            common.logger.success('Room saved');
            common.$state.go('roomDetail', { id: roomListing.id },{reload: true});
          }, function (errors) {
            common.logger.error('error while saving room listing');
            console.log('error(s) while saving room listing', errors);
          });
      } else {
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

    mixpanel.track("add a room");
    mixpanel.people.increment('add a room');

  }

}());

