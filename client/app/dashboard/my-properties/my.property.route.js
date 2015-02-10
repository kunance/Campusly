(function() {
  "use strict";

  angular
    .module('app.dashboard')
    .config(config);

  config.$inject=['$stateProvider', '$urlRouterProvider'];

  function config ($stateProvider, $urlRouterProvider) {
   // $urlRouterProvider.when('/dashboard', '/dashboard/summary');
    $stateProvider
      .state('myProperties', {
        url: '/myProperties',
        templateUrl: 'app/dashboard/my-properties/my.properties.html',
        controller: 'MyPropertiesCtrl',
        controllerAs:'myProperties',
        authenticate: true
      });
  }
}());
