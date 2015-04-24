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
    var distinct_id = mixpanel.get_distinct_id();
    mixpanel.track("landing page",{distinct:distinct_id});

    // Godaddy seal code - to be revisited

    //$("#GoDaddySSLSeal img")
    //  .on("click", verifyGoDaddySSLSeal)
    //  .preloadImages(function() { $(this).fadeIn(2000); });
    //  $(['https://seal.godaddy.com//images//3//en//siteseal_gd_3_h_d_m.gif']).preload();
    //
    //function verifyGoDaddySSLSeal()
    //{
    //  window.open
    //  (
    //    "https://seal.godaddy.com//verifySeal?sealID=aInIGq1vCUvVSh4ue6qNkcQkVqX63cbJ7voKlTyjAqcjRbztpY2DAv",
    //    "SealVerfication",
    //    "location=yes,status=yes,resizable=yes,scrollbars=no,width=592,height=433"
    //  );
    //}
  }
}());

