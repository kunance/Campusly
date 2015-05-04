(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .controller('aroundYouCtrl', aroundYouCtrl);

  aroundYouCtrl.$inject = ['common', 'currentUser', 'UserResource', '$window', '$q'];

  function aroundYouCtrl(common, currentUser, UserResource, $window, $q) {
    var vm = this;
    vm.me = currentUser;
    vm.education = common.dataservice.getAllEducations(currentUser.id);
    vm.address = common.dataservice.getAllAddresses(currentUser.id);
    var promises = [vm.address.$promise, vm.education.$promise];
    $q.all(promises).then(function () {
      initializearoundYouController()
    });

    function initializearoundYouController() {
        vm.initialized = true;
        vm.showSearch = false;
        vm.me.experianIdToken = vm.me.experianIdToken || 1;
        var query = {};

        vm.clearSearch = function() {
        vm.query = {
          carpoolingToCampus: null,
          carpoolingFromCampus: null,
          carpoolingForGroceries: null,
          carpoolingForRoadtrip: null,
          carpoolingSplit: null,
          walkingToCampus: null,
          walkingFromCampus: null,
          meetForHangout: null,
          meetForStudy: null,
          meetForEvents: null
        };
      };

      vm.setQueryAndSearch= function (q) {
        query = q;
        UserResource.aroundMe({distance:(1609 * (vm.me.experianIdToken || 1)), limit: 80, query:query}, function (aroundYou) {
          vm.aroundYou = aroundYou;
          vm.groups = vm.aroundYou.inGroupsOf(8);
        }, function (err) {
          common.logger.error('something went wrong! ',err);
        });
        orderSliderButtons()
     };

      vm.setQueryAndSearch();
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

    angular.element($window).bind('resize', function () {
      orderSliderButtons();
    });

    angular.element(document).ready(function () {
      orderSliderButtons();
    });

    mixpanel.track("aroundYou grid view");
    mixpanel.people.increment('aroundYou grid view');
  }

}());
