(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .controller('aroundYouCtrl', aroundYouCtrl);

  aroundYouCtrl.$inject = ['common', 'currentUser', 'data', 'UserResource', '$window'];

  function aroundYouCtrl(common, currentUser, data, UserResource, $window) {
    var vm = this;
    vm.me = currentUser;
    vm.education = data[0];

    UserResource.aroundMe({distance:( /*miles * */ 1609 ), limit: 100}, function (aroundYou) {
      vm.aroundYou = aroundYou;
      vm.groups = vm.aroundYou.inGroupsOf(8);
    }, function (err) {
      common.logger.error('something went wrong! ',err);
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

    angular.element($window).bind('resize', function () {
      orderSliderButtons();
    });

    angular.element(document).ready(function () {
      orderSliderButtons();
    });

    mixpanel.track('aroundYou grid view');
  }

}());
