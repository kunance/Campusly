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

    vm.sortOrder = 'ascending';  // default
    vm.sortBy = 'availableMoveIn';  // default


    vm.showSearch = false; // default
    vm.showSort = false; // default


    vm.clearSearch = function(showSearch) {
      vm.searchCriteria = {
        maxMonthlyPrice: null,
        leaseType: null,
        maxCurrentRoomates: null,
        propertyType: null,
        sharedBathroom: null,
        roomType : null,
        furnished: null,
        smokingAllowed: null,
        gender: null,
        petsAllowed: null,
        parkingAvailable: null
      };
    };


    vm.clearSearch(false);

    vm.search = function(showSearch) {
      RoomListingView.query({sortBy: vm.sortBy, sortOrder: vm.sortOrder, search: vm.searchCriteria}, function(availRooms) {
        vm.availableRooms = availRooms;
        //console.log(vm.availableRooms);
        vm.groups = vm.availableRooms.inGroupsOf(8);
        //console.log('grupe', vm.groups);
        /* vm.availableRooms = availRooms;
         console.log("availableRooms: ", vm.availableRooms); */

        // keep view clean of searcha and sort values so user can focus on available rooms
        vm.showSearch = showSearch;
        vm.showSort = showSearch;
      });
    };

    vm.search(false);

    vm.clearSearchAndSearch = function(showSearch) {
      vm.clearSearch(false);
      vm.search(showSearch);
    };

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
  }


}());

