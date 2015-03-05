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

    vm.roomDetail = RoomListingView.get( {id: 4},  function() {
      // vm.availableRooms = availRooms;
      //  console.log("availableRooms: ", vm.availableRooms);
    });

    console.log("roomDetail: ", vm.roomDetail);


    //$http.get("../assets/fake/available_rooms.json")
    //  .success(function(data){
    //    vm.availableRooms = data;
    //  });

  }


}());

