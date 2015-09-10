(function () {
  "use strict";

  angular
  .module('app.dashboard')
  .controller('LookingCtrl', LookingCtrl);

  LookingCtrl.$inject = ['$scope','common', '$window', 'Lookings', 'currentUser', '$q', 'screenSize', 'ngDialog', '$cookieStore'];

  function LookingCtrl($scope, common, $window, Lookings, currentUser, $q, screenSize, ngDialog, $cookieStore) {
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
      vm.sortOrder = 'descending';
      vm.sortBy = 'createdAt';
      vm.showSearch = false;
      vm.showSort = false;
      var localLookingData; //default. define local storage variable

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

      /*
       * Set initial fields for the search criteria. If there is data in the local cookie use that instead.
       * This means that a user has to press Reset on the front-end to default to the standard search
       */
      vm.setSearchFields = function () {
        if(vm.education.relatedUniversityId) {
          vm.univCriteria.shortName = vm.univCriteria.shortName || vm.universitiesList[vm.education.relatedUniversityId.id-1];
        }
        var roommateCookieVariable = $cookieStore.get('roommateSearchFields');
        if(roommateCookieVariable) {
          vm.searchCriteria = roommateCookieVariable;
        }
        else {
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
        }
      };

      //Initializes search fields
      vm.setSearchFields();

      /*
       * Removes cookie and calls setSearchField function to set the default values of search criteria.
       */
      vm.clearSearch = function(showSearch) {
        /*
         * Remove local storage data and cookie data
         */
        localStorage.removeItem('availableLookings');
        $cookieStore.remove('roommateSearchFields');
        vm.setSearchFields();
      };

      var lookingLimit;
      if (screenSize.is('xs')){
        lookingLimit = 32;
      }
      else {
        lookingLimit = 64;
      }

      /*
       * Function for searching if the search button is pressed on the front end.
       * Clear local storage before executing search function
       */
      vm.searchFromButton = function () {
        localStorage.removeItem('availableLookings');
        vm.search(false);
      };

      vm.search = function(showSearch) {

        /*
         * Check if there is local data already present. If no local data is present only then run a search query to the server
         */

        if(localLookingData != null) {
          vm.lookings = JSON.parse(localLookingData);
          arrangeLookingInfo (vm.lookings);
          vm.groups = vm.lookings.inGroupsOf(8);
          vm.showSearch = showSearch;
          vm.showSort = showSearch;
        }
        else {
          Lookings.query({sortBy: vm.sortBy, sortOrder: vm.sortOrder, search: vm.searchCriteria, univId: vm.univCriteria.shortName.id, limit: lookingLimit}, function (activeLookings) {
            vm.lookings = activeLookings;
            arrangeLookingInfo (vm.lookings);
            vm.groups = vm.lookings.inGroupsOf(8);
            vm.showSearch = showSearch;
            vm.showSort = showSearch;
            $cookieStore.put('roommateSearchFields', vm.searchCriteria); // store search fields to the cookie
            localStorage.setItem('availableLookings', JSON.stringify(vm.lookings)); // store housing data locally
          });
        }

        orderSliderButtons();
      };
      vm.search(false);
      vm.clearSearchAndSearch = function(showSearch) {
        vm.clearSearch(false);
        vm.search(showSearch);
      };

      /*
       *  ngDialog
       */
      $scope.open = function (emailAddress, firstname, lastname) {
        ngDialog.open({
          template: 'aroundYouMessage',
          controller: 'ngDialogCtrl',
          data: {
            email: emailAddress,
            firstName: firstname,
            lastName: lastname}
        });
      };

      angular.element($window).bind('resize', function () {
        orderSliderButtons();
      });

      /*
       * Parse the local data or data from server. Push to the buffer to display the ID of the rooms as well as the people to message
       */
      function arrangeLookingInfo(availLooking) {
        vm.allIds = [];
        angular.forEach(availLooking, function (looking) {
          vm.allIds.push(looking.id);
        });
      }

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

    }

    mixpanel.track("looking grid view");
    mixpanel.people.increment('looking grid view');

    /*
     *  prerender.io
     */
    $scope.$parent.seo = {
      pageTitle: 'Campusly Roommates',
      pageDescription: 'Find a roommate when living off-campus'
    };
  }

}());
