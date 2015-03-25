(function () {
  "use strict";

  angular
  .module('app.dashboard')
  .controller('LookingCtrl', LookingCtrl);

  LookingCtrl.$inject = ['common', 'currentUser', '$window', 'Lookings'];

  function LookingCtrl(common, currentUser, $window, Lookings) {
    var vm = this;

    vm.me = currentUser;

/* BEGIN OF COPY PASTE FROM ROOM CTRL */

    vm.sortOrder = 'ascending';  // default
    vm.sortBy = 'moveInDate';  // default


    vm.showSearch = false; // default
    vm.showSort = false; // default

    vm.clearSearch = function(showSearch) {
      vm.searchCriteria = {
        maxMonthlyRent: null,
        utilitiesIncluded: null,
        numRoommates: null,
       // propertyType: null,
        sharedBathroom: null,
        roomType : null,
        furnished: null,
        smokingAllowed: null,
        gender: null,
        petsAllowed: null,
        parkingNeeded: null
      };
    };

    vm.clearSearch(false);

    vm.search = function(showSearch) {
      Lookings.query({sortBy: vm.sortBy, sortOrder: vm.sortOrder, search: vm.searchCriteria}, function (activeLookings) {
        vm.lookings = activeLookings;
        vm.groups = vm.lookings.inGroupsOf(8);
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

    angular.element($window).bind('resize', function () {
      orderSliderButtons();
    });


    /* END OF COPY PASTE FROM ROOM CTRL */


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

    mixpanel.track('looking grid view');

  }

}());
