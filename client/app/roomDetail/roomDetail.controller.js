(function () {
  "use strict";

  angular
    .module('app.roomDetail')
    .controller('RoomDetailCtrl', RoomDetailCtrl);

  RoomDetailCtrl.$inject = ['common', '$scope', '$stateParams',  'logger', 'Auth', 'RoomListingView', 'UserResource'];

  function RoomDetailCtrl(common, $scope, $stateParams, logger, Auth, RoomListingView, UserResource) {
    var vm = this;
    vm.property = {};
    vm.me = Auth.getCurrentUser();

    //console.log('me:  ', vm.me);

    var roomId = $stateParams.id;
   // logger.log('Room id: ', roomId);

    if(roomId) {
      vm.roomDetail = RoomListingView.get({id: roomId}, function () {
        //console.log('RoomDetail: ', vm.roomDetail);
        vm.creatorId = vm.roomDetail.roomDetails.creatorId;
        //console.log('Creator id: ', vm.creatorId);
        UserResource.get({id: vm.creatorId}, function (aa) {
          vm.creatorEmail=aa.email;
        });
        common.dataservice.getAllRoommates(vm.creatorId, function (data) {
          vm.creatorRoommates=data;
          //console.log('Creator roommates: ',  vm.creatorRoommates);
        })
      });


      //one service call to get users current address location AND current university name and location
      vm.userCurrentAddressAndUnivCoords = UserResource.getCurrentAddressAndUniv({id: vm.me.id}, function () {
        // vm.roomDetail = roomDetail;
        //console.log("vm.userCurrentAddressAndUnivCoords: ", vm.userCurrentAddressAndUnivCoords);
      });

      mixpanel.track('roomDetail view');
    //  common.dataservice.getAllRoommates(vm.roomDetail.creatorId)

      // TODO use users current address and university location to ask https://developers.google.com/maps/documentation/directions/ to get distances

    }
  }
}());

