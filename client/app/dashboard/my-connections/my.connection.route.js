(function() {
  "use strict";

  angular
    .module('app.dashboard')
    .config(config);

  config.$inject=['$stateProvider', '$urlRouterProvider'];

  function config ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('dashboard.myConnections', {
        url: '/myConnections',
        templateUrl: 'app/dashboard/my-connections/my.connection.html',
        controller: 'MyConnectionCtrl',
        controllerAs:'myConnection',
        authenticate: true
      });

  }
}());
