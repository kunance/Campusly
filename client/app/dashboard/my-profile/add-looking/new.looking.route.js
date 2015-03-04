
(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .config(function($stateProvider) {
      $stateProvider
        .state('dashboard.myProfile.addNewLooking', {
          url: '/addNewLooking',
          templateUrl: 'app/dashboard/my-profile/add-looking/new.looking.html',
          controller: 'NewLookingCtrl',
          controllerAs:'newLooking',
          authenticate: true
        });
    });

}());
