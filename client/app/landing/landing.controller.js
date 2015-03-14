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

  }

  }());

