(function () {
  "use strict";

  angular
  .module('app.dashboard')
  .controller('LookingCtrl', LookingCtrl);

  LookingCtrl.$inject = ['common', 'currentUser', '$window', 'Lookings', 'data'];

  function LookingCtrl(common, currentUser, $window, Lookings, data) {
    var vm = this;

    vm.me = currentUser;
    vm.universitiesList = data[0];
    vm.education = data[1];
    vm.univCriteria = {shortName:''};
    vm.sortOrder = 'ascending';  // default
    vm.sortBy = 'moveInDate';  // default
    vm.showSearch = false; // default
    vm.showSort = false; // default

    vm.clearSearch = function(showSearch) {
      vm.searchCriteria = {
        maxMonthlyRent: null,
        utilitiesIncluded: null,
        numRoommates: null,
        sharedBathroom: null,
        roomType : null,
        furnished: null,
        smokingAllowed: null,
        gender: null,
        petsAllowed: null,
        parkingNeeded: null,
        openToFullYearLeaseNewRoomates: null
      };
      vm.univCriteria.shortName = {};
    };

    vm.clearSearch(false);

    vm.search = function(showSearch) {
      Lookings.query({sortBy: vm.sortBy, sortOrder: vm.sortOrder, search: vm.searchCriteria}, function (activeLookings) {
        vm.allIds = [];
        if(vm.univCriteria.shortName.id){
          var results = [];
          angular.forEach(activeLookings, function (looking) {
          if (looking.relatedUserId.usereducationUsers.length && looking.relatedUserId.usereducationUsers[0].relatedUniversityId.id == vm.univCriteria.shortName.id) {
            results.push(looking);
              vm.allIds.push(looking.id)
          }
        });
          vm.lookings = results;
        } else {
          vm.lookings = activeLookings;
          angular.forEach(activeLookings, function (looking) {
            vm.allIds.push(looking.id)
          });
        }
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

    mixpanel.track("looking grid view");
    mixpanel.people.increment('looking grid view');

  }

}());
