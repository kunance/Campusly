(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .controller('MyRoomsCtrl', MyRoomsCtrl);

  MyRoomsCtrl.$inject = ['$scope', 'common', 'FileUploader', '$http'];

  function MyRoomsCtrl($scope, common, FileUploader, $http) {
    var vm = this;
    vm.property = {};
    vm.me = common.Auth.getCurrentUser();
    //vm.listOfProperties=getAllProperties;
    //console.log(vm.listOfProperties);


    // ================================================
    // BEGIN Getter for mock data
    // ================================================

    $http.get("../assets/fake/available_rooms.json")
      .success(function(data){
        vm.availableRooms = data;
      });

    // ================================================
    // END Getter for mock data
    // ================================================

  }


}());

