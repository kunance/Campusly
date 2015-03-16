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
    var destination =  vm.roomDetail.propertyDetails.coords;
    distanceCalculator.calculateDistanceForEveryTransport(source,destination).then(function (data) {
      vm.distance = data;
    });

    mixpanel.track('roomDetail view');
  }
}());

