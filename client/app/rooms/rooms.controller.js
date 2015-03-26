(function () {
  "use strict";

  angular
  .module('app.rooms')
  .controller('RoomsCtrl', RoomsCtrl);

  RoomsCtrl.$inject = ['$scope', '$window', 'common', 'RoomListingView', 'currentUser', 'data'];

  function RoomsCtrl($scope, $window, common, RoomListingView, currentUser, data) {
    var vm = this;
    vm.property = {};
    vm.me = currentUser;
    vm.education = data[0];
    var currentUniversityId = vm.education.universityId;

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
        parkingAvailable: null,
        within: null
      };
    };


    vm.clearSearch(false);

    vm.search = function(showSearch) {

      console.log("Distance! ", vm.searchCriteria.within);
      if(vm.searchCriteria.within) {
        // have to add info for the server side API  ... add university id if know so server doesn't have to lookup and throw
        // if you do NOT have one ... PLUS you can use this to ng-show/ng-hide the distance on the partial if student
        // does NOT have one
        vm.searchCriteria.within.place = { type: 'univ', id: currentUniversityId }
      }


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

      // must call in order to have slider controls rendered correctly
      orderSliderButtons();
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

    angular.element($window).bind('resize', function () {
      orderSliderButtons();
    });

    angular.element(document).ready(function () {
      orderSliderButtons();
    });


    mixpanel.track('room grid view');
  }


}());

