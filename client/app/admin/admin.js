(function () {
  "use strict";

  angular.module('RentedApp')
    .config(function($stateProvider) {
      $stateProvider
        .state('admin', {
          url: '/admin',
          templateUrl: 'app/admin/admin.html',
          controller: 'AdminCtrl'
        });
    });


}());

