(function() {
  "use strict";

  angular
    .module('app.dashboard')
    .config(config);

  config.$inject=['$stateProvider', '$urlRouterProvider'];

  function config ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('dashboard.messages', {
        url: '/messages',
        templateUrl: 'app/dashboard/messages/messages.html',
        controller: 'MyMessagesCtrl',
        controllerAs:'myMessages',
        authenticate: true
      });

  }
}());
