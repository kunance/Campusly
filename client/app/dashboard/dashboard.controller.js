(function() {

  "use strict";

  angular
  .module('app.dashboard')
  .controller('DashboardCtrl',DashboardCtrl);

  DashboardCtrl.$inject=['common', '$scope', '$http'];

  function DashboardCtrl(common, $scope, $http) {
    var vm = this;
    var Auth = common.Auth;
    vm.address = { };
    vm.me = Auth.getCurrentUser();

    vm.tabs = [
    { title:"Dashboard", sref:"dashboard", active: true },
    { title:"My profile", sref:".myProfile"},
    { title:"My properties", sref:".myProperties"},
    { title:"My connections", sref:".myConnections"},
    { title:"My favorites", sref:".myFavorites"},
    { title:"Messages", sref:".messages"}];

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
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }, {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }
      ]
    }

  }

  angular.element(document).ready(function () {
    setTimeout(function() {
      $(".slider").each(function(index) {
        var slider = $(".slider").eq(index)
        var dotsX = parseInt(slider.find(".slick-dots").css("left"));
        var dotsSize = parseInt(slider.find(".slick-dots").css("width"));
        var nextBtnX = dotsX + dotsSize + 10;

        slider.find(".slick-next").css("left", nextBtnX);
      });
    }, 500);
  });

}());
