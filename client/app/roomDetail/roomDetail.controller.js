(function () {
  "use strict";

  angular
    .module('app.roomDetail')
    .controller('RoomDetailCtrl', RoomDetailCtrl);

  RoomDetailCtrl.$inject = ['$scope', '$http', '$stateParams',  'logger', 'Auth', 'RoomListingView', 'UserResource'];

  function RoomDetailCtrl($scope, $http, $stateParams, logger, Auth, RoomListingView, UserResource) {
    var vm = this;
    vm.property = {};
    vm.me = Auth.getCurrentUser();


    console.log('me:  ', vm.me);

    var roomId = $stateParams.id;
    logger.log('Room id: ', roomId);

    if(roomId) {
      vm.roomDetail = RoomListingView.get({id: roomId}, function () {
        // vm.roomDetail = roomDetail;
        console.log("roomDetail: ", vm.roomDetail);
      });

      // one service call to get users current address location AND current university name and location
      vm.userCurrentAddressAndUnivCoords = UserResource.getCurrentAddressAndUniv({id: vm.me.id}, function () {
        // vm.roomDetail = roomDetail;
        console.log("userUniversity: ", vm.userCurrentAddressAndUnivCoords);
      });

      // TODO use users current address and university location to ask https://developers.google.com/maps/documentation/directions/ to get distances

    }
  }
}());

