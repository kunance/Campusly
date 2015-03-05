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

    vm.availableRooms = RoomListingView.query(function(/*availRooms*/) {
      // vm.availableRooms = availRooms;
      //  console.log("availableRooms: ", vm.availableRooms);
    });

    console.log("availableRooms: ", vm.availableRooms);


    //$http.get("../assets/fake/available_rooms.json")
    //  .success(function(data){
    //    vm.availableRooms = data;
    //  });

  }


}());

