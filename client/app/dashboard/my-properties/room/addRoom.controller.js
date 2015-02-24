
(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .controller('AddRoomCtrl', AddRoomCtrl);

  AddRoomCtrl.$inject = ['$scope', 'common', 'FileUploader'/*, 'getAllProperties'*/];

  function AddRoomCtrl($scope, common, FileUploader /*, getAllProperties*/) {
    var vm = this;
    vm.property = {};
    vm.me = common.Auth.getCurrentUser();
    //vm.listOfProperties=getAllProperties;

    //console.log(vm.listOfProperties);




    $scope.images = [{
      src: 'http://www.gulfshores.com/!userfiles/content_images/stay/agc_2013_int_content-img_beach-houses.jpg',
      title: 'Pic 1'
    }, {
      src: 'http://s.hswstatic.com/gif/become-white-house-volunteer-1.jpg',
      title: 'Pic 2'
    }];

  }


}());
