(function () {
  "use strict";

  angular
  .module('app.dashboard')
  .controller('MyPropertiesCtrl', MyPropertiesCtrl);

  MyPropertiesCtrl.$inject = ['$scope', 'common', 'FileUploader', '$http'/*, 'getAllProperties'*/];

  function MyPropertiesCtrl($scope, common, FileUploader, $http /*, getAllProperties*/) {
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
