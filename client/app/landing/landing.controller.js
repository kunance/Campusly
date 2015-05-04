(function () {
  "use strict";

  angular
    .module('app.landing')
    .controller('LandingCtrl', LandingCtrl);

  LandingCtrl.$inject=['$scope'];

  function LandingCtrl($scope) {
    $scope.$parent.seo = {
      pageTitle: 'Campusly',
      pageDescription: 'Secure off-campus community. Connect with verified students. Find off-campus housing. Meet new students - walk safely, share a ride, attend events.'
    };

    if(window.Gdistinct_id) {
      mixpanel.track("landing page");
    }

  }
}());

