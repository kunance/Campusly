(function() {
  "use strict";

  angular
    .module('app.dashboard')
    .config(config);

  config.$inject=['$stateProvider', '$urlRouterProvider'];

  function config ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('dashboard.around', {
        url: '/around',
        templateUrl: 'app/dashboard/around/around.html',
        controller: 'AroundCtrl',
        controllerAs:'around',
        authenticate: true
      });

  }
}());
