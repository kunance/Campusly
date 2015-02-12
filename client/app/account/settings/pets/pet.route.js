(function () {
  "use strict";

  angular
    .module('app.account')
    .config(function($stateProvider) {
      $stateProvider
        .state('settings.pets', {
          url: '/pets',
          templateUrl: 'app/account/settings/pets/pet.html',
          controller: 'PetCtrl',
          controllerAs:'pet',
          authenticate: true
        });
    });

}());
