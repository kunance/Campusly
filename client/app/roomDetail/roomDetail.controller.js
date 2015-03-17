(function () {
  "use strict";

  angular
    .module('app.roomDetail')
    .controller('RoomDetailCtrl', RoomDetailCtrl);

  RoomDetailCtrl.$inject = ['currentUser', 'data', 'getCreatorRoommates','distanceCalculator'];

  function RoomDetailCtrl(currentUser, data, getCreatorRoommates,distanceCalculator) {
    var vm = this;
    vm.property = {};
    vm.me = currentUser;
    vm.education = data[0];
    vm.roomDetail = data[1];
    vm.creatorEmail = data[1].roomDetails.relatedCreatorId.email;
    vm.creatorRoommates = getCreatorRoommates;
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
    mixpanel.track('roomDetail view');
  }
}());

