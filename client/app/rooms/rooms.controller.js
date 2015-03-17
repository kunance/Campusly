(function () {
  "use strict";

  angular
  .module('app.rooms')
  .controller('RoomsCtrl', RoomsCtrl);

  RoomsCtrl.$inject = ['$scope', 'common', 'RoomListingView', '$filter'];

  function RoomsCtrl($scope, common, RoomListingView, $filter) {
    var vm = this;
    vm.property = {};
    vm.me = common.Auth.getCurrentUser();
    vm.asc = true;

    vm.sortExpression = 'monthlyPrice';

    vm.mySortFunction = function(room) {
      //console.log('ulazim');
      if(isNaN(room.roomDetails[vm.sortExpression]))
        return room.roomDetails[vm.sortExpression];
      return parseInt(room.roomDetails[vm.sortExpression]);
    };

   RoomListingView.query(function(availRooms) {
     vm.availableRooms = availRooms;
     //console.log(vm.availableRooms);
       vm.groups = vm.availableRooms.inGroupsOf(8);
     //console.log('grupe', vm.groups);
     /* vm.availableRooms = availRooms;
     console.log("availableRooms: ", vm.availableRooms); */
   });

    function orderSliderButtons() {
      setTimeout(function() {
        $(".slider").each(function(index) {
          var slider = $(".slider").eq(index);
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

    mixpanel.track('room grid view');

    //console.log(vm.availableRooms);

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

