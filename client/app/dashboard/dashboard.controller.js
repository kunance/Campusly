(function() {

  "use strict";

  angular
  .module('app.dashboard')
  .controller('DashboardCtrl',DashboardCtrl);

  DashboardCtrl.$inject= ['common', '$scope', 'currentUser', 'data', 'RoomListingView'];

  function DashboardCtrl(common, $scope, currentUser, data, RoomListingView) {
    var vm = this;
    /*
     *  Fetch all required data for controller from route resolve (testing)
     */
    vm.busy = data; //one promise witch need to be resolved in order to initialize controller (we use for show busy sign)
    vm.me = currentUser;
    vm.lookingRoom = data[0];
    vm.userLookings = data[1];
    vm.myRoomListings = data[2];
    vm.numberOf = data[3].length;
    vm.aroundYou = data[4];
    vm.address = data[5];
    vm.userStatus = data[6];
    vm.education = data[7];
    var action;
    vm.userStatus.id ? action = 'update' : action = 'save';
    vm.me.experianIdToken = vm.me.experianIdToken || 1;

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
      within: {
        distance:100,
        place:{ type: 'univ', id: vm.education.universityId }
      }
    };
    vm.sortOrder = 'ascending';  // default
    vm.sortBy = 'availableMoveIn';  // default
    RoomListingView.query({sortBy: vm.sortBy, sortOrder: vm.sortOrder, search: vm.searchCriteria, univId: vm.education.universityId, limit:9}, function(availRooms) {
      vm.availableRooms = availRooms;
    });

    /*
     *  prerender.io
     */
    $scope.$parent.seo = {
      pageTitle:'Campusly Dashboard',
      pageDescription:'Your personal dashboard'
    };
    /*
     *  breakpoints and slider options
     */

    vm.updateStatus= function (form, data) {
      if (action == 'save') {
        common.dataservice.addStatus(vm.me.id, data)
          .$promise
          .then(function (status) {
            vm.userStatus = status;
            common.logger.success('Your status is updated');
          })
          .catch(function () {
            common.logger.error('error');
          })
      }
      if (action=='update') {
        common.dataservice.editStatus(vm.me.id, vm.userStatus.id, data)
          .$promise
          .then(function (status) {
            vm.userStatus = status;
            common.logger.success('Your status is updated');
          })
          .catch(function () {
            common.logger.error('error');
          })
      }
    };


    vm.breakpoints = {
      availableRooms: [
      {
        breakpoint: 1224,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }, {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
      , {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      ],
      lookingRoom: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }, {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      ],
      aroundYou: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5
        }
      }, {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
      ]
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

    mixpanel.track("dashboard");
    mixpanel.identify(vm.me.id);
    mixpanel.people.set_once({
      "$email": vm.me.email,
      "$first_name":vm.me.firstname,
      "$last_name":vm.me.lastname,
      "$created": vm.me.createdAt,
      "$phone": vm.me.phone,
      "$first_login": new Date()
    });
    mixpanel.people.set({
      "$last_login": new Date()
    });
    mixpanel.people.increment('dashboard');

  }
}());
