(function () {
  "use strict";

  angular
    .module('app.landing')
    .controller('LandingCtrl', LandingCtrl);

  LandingCtrl.$inject=['$scope', 'common', '$state'];

  function LandingCtrl($scope, common, $state) {
    // vm for view model .... https://github.com/johnpapa/angularjs-styleguide#style-y032
    /* jshint validthis: true */
    var vm = this;

    $scope.$parent.seo = {
      pageTitle: 'Campusly',
      pageDescription: 'Secure off-campus community. Connect with verified students. Find off-campus housing. Meet new students - walk safely, share a ride, attend events.'
    };
    mixpanel.track("landing page");

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

