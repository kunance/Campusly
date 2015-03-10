(function () {
  "use strict";

  angular
    .module('app.rooms')
    .controller('RoomsCtrl', RoomsCtrl);

  RoomsCtrl.$inject = ['$scope', 'common', 'FileUploader', '$http', 'getAllRooms'];

  function RoomsCtrl($scope, common, FileUploader, $http, getAllRooms) {
    var vm = this;
    vm.property = {};
    vm.me = common.Auth.getCurrentUser();
    vm.availableRooms = getAllRooms;

    console.log(vm.availableRooms);

    //vm.availableRooms = RoomListingView.query(function(/*availRooms*/) {
     // vm.availableRooms = availRooms;
    //  console.log("availableRooms: ", vm.availableRooms);
    //});

    //$http.get("../assets/fake/available_rooms.json")
    //  .success(function(data){
    //    vm.availableRooms = data;
    //  });

  }


}());

