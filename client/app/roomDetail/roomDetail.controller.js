(function () {
  "use strict";

  angular
    .module('app.roomDetail')
    .controller('RoomDetailCtrl', RoomDetailCtrl);

  RoomDetailCtrl.$inject = ['$scope', 'common', 'FileUploader', '$http', 'RoomListingView'];

  function RoomDetailCtrl($scope, common, FileUploader, $http, RoomListingView) {
    var vm = this;
    vm.property = {};
    vm.me = common.Auth.getCurrentUser();

    //TODO grab the room id from url
    var roomId = 4;
    vm.roomDetail = RoomListingView.get( {id: roomId},  function(roomDetail) {
      vm.roomDetail =  roomDetail;
      console.log("roomDetail: ", vm.roomDetail);
    });



    //$http.get("../assets/fake/available_rooms.json")
    //  .success(function(data){
    //    vm.availableRooms = data;
    //  });

  }


}());

