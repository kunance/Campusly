(function() {
  "use strict";

  angular
    .module('app.dashboard')
    .config(config);

  config.$inject=['$stateProvider', '$urlRouterProvider'];

  function config ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('dashboard.looking', {
        url: '/looking',
        templateUrl: 'app/dashboard/looking/looking.html',
        controller: 'LookingCtrl',
        controllerAs:'looking',
        authenticate: true
      });

  }
}());
