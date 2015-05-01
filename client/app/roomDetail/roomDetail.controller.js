(function () {
  "use strict";

  angular
    .module('app.roomDetail')
    .controller('RoomDetailCtrl', RoomDetailCtrl);

  RoomDetailCtrl.$inject = ['currentUser', 'data', 'getCreatorRoommates','distanceCalculator', '$stateParams', '$state', '$rootScope'];

  function RoomDetailCtrl(currentUser, data, getCreatorRoommates,distanceCalculator, $stateParams, $state, $rootScope) {
    var vm = this;
    vm.property = {};
    vm.me = currentUser;
    vm.education = data[0];
    vm.roomDetail = data[1];
    vm.creatorEmail = data[1].roomDetails.relatedCreatorId.email;
    vm.creatorFacebook = data[1].roomDetails.relatedCreatorId.facebook;
    vm.creatorRoommates = getCreatorRoommates[0];
    vm.confirmed = 0;
    vm.unconfirmed = 0;
    angular.forEach(vm.creatorRoommates, function (roommate) {
      roommate.confirmed ? vm.confirmed += 1 : vm.unconfirmed += 1;
    });

    vm.allIds = ($stateParams.allIds).split(",").map(Number);
    var id = $stateParams.param;
    $rootScope.currentRoom =  vm.allIds.indexOf(+id);
    vm.next = function () {
      $rootScope.currentRoom += 1;
      $state.go('roomDetail',{param:vm.allIds[$rootScope.currentRoom], allIds:vm.allIds});
    };

    vm.previous = function () {
      $rootScope.currentRoom -= 1;
      $state.go('roomDetail',{param:vm.allIds[$rootScope.currentRoom], allIds:vm.allIds});
    };

    var source = vm.education.relatedUniversityId;
    var destination = vm.roomDetail.propertyDetails.coords;
    if (vm.education.id) {
      distanceCalculator.calculateDistanceForEveryTransport(source, destination, 'duration').then(function (data) {
        vm.duration = data;
      });
      distanceCalculator.calculateDistanceForEveryTransport(source, destination, 'distance').then(function (data) {
        vm.distance = data;
      });
    }
    mixpanel.track("roomDetail view");
    mixpanel.people.increment('roomDetail view');
  }
}());

