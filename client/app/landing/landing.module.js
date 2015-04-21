(function () {
  "use strict";

  angular
    .module('app.landing', [])
    .config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
    $stateProvider
      .state('landing', {
        url: '/',
        templateUrl: 'app/landing/landing.html',
        controller: 'LandingCtrl',
        controllerAs: 'landing',
        authenticate: false
      });
  }

}());
