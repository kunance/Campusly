(function() {
  "use strict";

  angular
    .module('app.dashboard')
    .config(config);

  config.$inject=['$stateProvider', '$urlRouterProvider'];

  function config ($stateProvider, $urlRouterProvider) {
    // $urlRouterProvider.when('/dashboard', '/dashboard/summary');
    $stateProvider
      .state('myProperties.addNew', {
        url: '/addNew',
        templateUrl: 'app/dashboard/my-properties/add.new.property/add.new.property.html',
        controller: 'AddNewPropertyCtrl',
        controllerAs:'addNew',
        authenticate: true
      });
  }
}());
