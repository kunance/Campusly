(function () {
  "use strict";

  angular
    .module('app.account')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('settings.pets', {
        url: '/pets',
        templateUrl: 'app/account/settings/pets/pet.html',
        controller: 'PetCtrl',
        controllerAs:'pet',
        resolve:{
          getPets: getPets
        },
        authenticate: true
      });
  }

  function getPets(common) {
    var dataservice = common.dataservice;
    var me = common.Auth.getCurrentUser();
    return dataservice.getAllPets(me)
  }

}());
