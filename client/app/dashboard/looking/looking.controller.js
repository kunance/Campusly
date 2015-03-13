(function () {
  "use strict";

  angular
  .module('app.dashboard')
  .controller('LookingCtrl', LookingCtrl);

  LookingCtrl.$inject = ['common', 'allLooking', 'LookListingView'];

  function LookingCtrl(common, allLooking, LookListingView) {
    var vm = this;
    vm.me = common.Auth.getCurrentUser();
    vm.asc = true;

    LookListingView.query(function(availLooking) {
      vm.availableLookings = availLooking;
      vm.groups = vm.availableLookings.inGroupsOf(8);
      /* vm.availableRooms = availRooms;
       console.log("availableRooms: ", vm.availableRooms); */
    });

    vm.aaa = aaa;
    function aaa() {
      $filter('orderBy', vm.availableLookings, vm.mySortFunction(), vm.asc);
      console.log(vm.availableLookings);



      vm.groups =  vm.availableLookings.inGroupsOf(8);
      // vm.groups.splice(0,1)
      /* vm.availableRooms = availRooms;
       console.log("availableRooms: ", vm.availableRooms); */


    };

    vm.lookings = allLooking;
    console.log(vm.lookings);

    function orderSliderButtons() {
      setTimeout(function() {
        $(".slider").each(function(index) {
          var slider = $(".slider").eq(index)
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

    console.log(vm.availableLookings);

  }

}());
