(function() {

  "use strict";

  angular
  .module('app.dashboard')
  .controller('DashboardCtrl',DashboardCtrl);


  DashboardCtrl.$inject=
    ['common', '$scope', 'currentUserLookings', 'allLooking', 'RoomListingView', 'RoomListing', 'distanceCalculator', 'currentUser'];

  function DashboardCtrl(
    common, $scope, currentUserLookings, allLooking, RoomListingView, RoomListing, distanceCalculator, currentUser) {
    var vm = this;
    /*
     *  Fetch all required data for controller from route resolve
     */
    vm.me = currentUser;
    vm.lookingRoom = allLooking;
    vm.userLookings = currentUserLookings;
    console.log('currentUserLookings:', currentUserLookings);
    /*
     *  Fetching rooms data, TODO rework to resolve data before view resolve (to be consistent)
     */
    vm.availableRooms = RoomListingView.query(function() {
      console.log('Available rooms: ', vm.availableRooms);
    });
    vm.myRoomListings = RoomListing.query({userId: vm.me.id}, function() {
      console.log('My room listings: ', vm.myRoomListings);
    });
    /*
     *  around you mock data ()
     *
    common.$http.get("../assets/fake/around_you.json")
    .success(function(data){
      vm.aroundYou = data;
    });*/
    /*
     *  prerender.io
     */
    $scope.$parent.seo = {
      pageTitle:'Campusly Dashboard',
      pageDescription:'Secure off-campus community'
    };
    /*
     *  breakpoints and slider options
     */
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

    mixpanel.identify(vm.me.id);
    mixpanel.people.set({
      "$email": vm.me.email,
      "$first_name":vm.me.firstname,
      "$last_name":vm.me.lastname,
      "$created": vm.me.createdAt,
      "$phone": vm.me.phone,
      "$last_login": new Date()
    });

    //// ================================================
    ////@ simple distance calculation
    //var src={
    //  latitude:'37.87220000',
    //  longitude:'-122.25869800'
    //};
    //var dest={
    //  latitude:'38.53823200',
    //  longitude:'-121.76171300'
    //};
    //var mode = 'WALKING';// WALKING DRIVING BICYCLING TRANSIT
    //var unitSystem = 'METRIC'; //IMPERIAL METRIC
    //common.$timeout(function () {
    //  distanceCalculator.calculateDistance(src, dest, mode, unitSystem).then(function (distance) {
    //    console.log(distance.text);
    //  });
    //}, 1000); //timeout because maps need some time to load
    ////@END
    //// ================================================

  }
}());
