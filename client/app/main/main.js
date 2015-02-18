(function () {
  "use strict";

  angular.module('RentedApp')
    .config(function($stateProvider) {
      $stateProvider
        .state('main', {
          url: '/',
          templateUrl: 'app/main/main.html',
          controller: 'MainCtrl',
          controllerAs:'main'
        //  authenticate: true
        });
    });

}());
