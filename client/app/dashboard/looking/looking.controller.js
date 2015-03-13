(function () {
  "use strict";

  angular
  .module('app.dashboard')
  .controller('LookingCtrl', LookingCtrl);

  LookingCtrl.$inject = ['common', 'allLooking', 'currentUser'];

  function LookingCtrl(common, allLooking, currentUser) {
    var vm = this;

    vm.me = currentUser;
    vm.lookings = allLooking;
    //console.log(vm.lookings);
    vm.groups = vm.lookings.inGroupsOf(8);
    //console.log(vm.groups);

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

    mixpanel.track('looking grid view');

  }

}());
