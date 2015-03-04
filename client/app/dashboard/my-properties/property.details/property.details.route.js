(function() {
  "use strict";

  angular
    .module('app.dashboard')
    .config(config);

  config.$inject=['$stateProvider', '$urlRouterProvider'];

  function config ($stateProvider, $urlRouterProvider) {
    // $urlRouterProvider.when('/dashboard', '/dashboard/summary');
    $stateProvider
    .state('dashboard.myProperties.details', {
      url: '/details',
      templateUrl: 'app/dashboard/my-properties/property.details/property.details.html',
      controller: 'PropertyDetailsCtrl',
      controllerAs:'details',
      authenticate: true
    });
  }
}());
