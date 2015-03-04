(function() {

  "use strict";

  angular
  .module('app.dashboard')
  .controller('DashboardCtrl',DashboardCtrl);

  DashboardCtrl.$inject=['common', '$scope', '$http', 'getUserLookings', 'allLooking', 'universityData', '$window'];

  function DashboardCtrl(common, $scope, $http, getUserLookings, allLooking, universityData, $window) {
    var vm = this;
    var Auth = common.Auth;
    vm.address = { };
    vm.me = Auth.getCurrentUser();

    //vm.universityList = universityData.getUniversityList(); //list of all universities from service
    //vm.lookingRoom = getUserLookings; //get all user lookings
    //vm.allLookings = allLooking.data; //get all lookings (from all users)


    vm.tabs = [
    { title:"Dashboard", sref:"dashboard", active: true },
    { title:"Messages", sref:".messages"},
    { title:"Around You", sref:".around"},
    { title:"My properties", sref:".myProperties"},
    { title:"Looking", sref:".looking"}];

    mixpanel.identify(vm.me.id);
    mixpanel.people.set({
      "$email": vm.me.email,
      "$first_name":vm.me.firstname,
      "$last_name":vm.me.lastname,
      "$created": vm.me.createdAt,
      "$phone": vm.me.phone,
      "$last_login": new Date()
    });


    // ================================================
    // BEGIN Getter for mock data
    // ================================================

    $http.get("../assets/fake/available_rooms.json")
    .success(function(data){
      vm.availableRooms = data;
    });

    $http.get("../assets/fake/looking_for_room.json")
    .success(function(data){
      vm.lookingRoom = data;
    });

    $http.get("../assets/fake/around_you.json")
    .success(function(data){
      vm.aroundYou = data;
    });

    $http.get("../assets/fake/messages.json")
    .success(function(data){
      vm.messages = data;
    });

    // ================================================
    // END Getter for mock data
    // ================================================


    $scope.$parent.seo = {
      pageTitle:'Rented Dashboard',
      pageDescription:'secure off-campus housing community'
    };

    mixpanel.track("visited dashboard view, with passed object",{title:$scope.$parent.seo.pageTitle});

    vm.breakpoints = {
      availableRooms: [
      {
        breakpoint: 1200,
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
    }

    function orderSliderButtons() {
      setTimeout(function() {
        $(".slider").each(function(index) {
          var slider = $(".slider").eq(index)
          var dotsX = parseInt(slider.find(".slick-dots").css("left"));
          var dotsSize = parseInt(slider.find(".slick-dots").css("width"));
          var nextBtnX = dotsX + dotsSize + 10;

          slider.find(".slick-next").css("left", nextBtnX);
        });
      }, 500);
    }

    $(window).resize(function(){
      orderSliderButtons();
    });

    angular.element(document).ready(function () {
      orderSliderButtons();
    });

  }
}());
