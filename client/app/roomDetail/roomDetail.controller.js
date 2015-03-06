(function () {
  "use strict";

  angular
    .module('app.roomDetail')
    .controller('RoomDetailCtrl', RoomDetailCtrl);

  RoomDetailCtrl.$inject = ['$scope', '$http', '$stateParams',  'logger', 'Auth', 'RoomListingView'];

  function RoomDetailCtrl($scope, $http, $stateParams, logger, Auth, RoomListingView) {
    var vm = this;
    vm.property = {};
    vm.me = Auth.getCurrentUser();

    var roomId = $stateParams.id;
    logger.log('Room id: ', roomId);

    if(roomId) {
      vm.roomDetail = RoomListingView.get({id: roomId}, function () {
        // vm.roomDetail = roomDetail;
        console.log("roomDetail: ", vm.roomDetail);
      });
    }
  }
}());

