(function() {
  "use strict";

  angular
    .module('app.dashboard')
    .config(config);

  config.$inject=['$stateProvider', '$urlRouterProvider'];

  function config ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('dashboard.myFavorites', {
        url: '/myFavorites',
        templateUrl: 'app/dashboard/favorites/my.favorites.html',
        controller: 'MyFavoritesCtrl',
        controllerAs:'myFavorites',
        authenticate: true
      });

  }
}());
