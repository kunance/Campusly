(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .config(function($stateProvider) {
      $stateProvider
        .state('dashboard.myProfile.addPet', {
          url: '/new',
          templateUrl: 'app/dashboard/my-profile/add-pet/add.pet.html',
          controller: 'AddPetCtrl',
          controllerAs:'addPet',
          authenticate: true
        });
    });

}());
