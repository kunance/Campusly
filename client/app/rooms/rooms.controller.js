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


    vm.availableRooms = RoomListingView.query(function(/*availRooms*/) {
      vm.groups = vm.availableRooms.inGroupsOf(8);
     /* vm.availableRooms = availRooms;
     console.log("availableRooms: ", vm.availableRooms); */
   });

    function orderSliderButtons() {
      setTimeout(function() {
        $(".slider").each(function(index) {
          var slider = $(".slider").eq(index)
          var dotsX = parseInt(slider.find(".slick-dots").css("left"));
          var dotsSize = parseInt(slider.find(".slick-dots").css("width"));
          var nextBtnX = dotsX + dotsSize + 10;

          slider.find(".slick-next").css("left", nextBtnX);
        });
      }, 1000);
    }

    $(window).resize(function(){
      orderSliderButtons();
    });

    angular.element(document).ready(function () {
      orderSliderButtons();
    });

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

