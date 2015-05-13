(function () {
  "use strict";

  angular
  .module('app.dashboard')
  .controller('LookingCtrl', LookingCtrl);

  LookingCtrl.$inject = ['$scope','common', '$window', 'Lookings', 'currentUser', '$q'];

  function LookingCtrl($scope, common, $window, Lookings, currentUser, $q) {
    var vm = this;
    vm.me = currentUser;
    vm.universitiesList = common.dataservice.getAllUniversities();
    vm.education =  common.dataservice.getAllEducations(vm.me.id);
    var promises = [vm.universitiesList.$promise, vm.education.$promise];
    $q.all(promises).then(function () {
      initializeLookingController()
    });

    function initializeLookingController() {
      vm.initialized = true;
      vm.univCriteria = {shortName:''};
      vm.sortOrder = 'ascending';
      vm.sortBy = 'moveInDate';
      vm.showSearch = false;
      vm.showSort = false;

      $scope.datePickers = {
        startDate: false,
        endDate:false
      };
      $scope.format = 'MM/dd/yyyy';
      $scope.clear = function () {
        $scope.dt = null;
      };

      $scope.open = function($event, number) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.datePickers[number]= true;
      };

      vm.clearSearch = function(showSearch) {
        vm.searchCriteria = {
          moveInDate: null,
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
        if(vm.education.relatedUniversityId)
        vm.univCriteria.shortName = vm.univCriteria.shortName || vm.universitiesList[vm.education.relatedUniversityId.id-1];
      };

      vm.clearSearch(false);
      vm.search = function(showSearch) {
        Lookings.query({sortBy: vm.sortBy, sortOrder: vm.sortOrder, search: vm.searchCriteria, univId: vm.univCriteria.shortName.id}, function (activeLookings) {
          vm.allIds = [];
          angular.forEach(activeLookings, function (looking) {
            vm.allIds.push(looking.id);
          });
          vm.lookings = activeLookings;
          vm.groups = vm.lookings.inGroupsOf(8);
          vm.showSearch = showSearch;
          vm.showSort = showSearch;
        });
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
  }

}());
