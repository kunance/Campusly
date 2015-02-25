(function () {
  "use strict";

  angular
    .module('app.account')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('dashboard.myProfile.editPet', {
        url: '/editPet/:id',
        templateUrl: 'app/dashboard/my-profile/edit-pet/edit.pet.html',
        controller: 'EditPetCtrl',
        controllerAs:'editPet',
        resolve:{
          getPet: getPet
        },
        authenticate: true
      });
  }

  function getPet(common, $stateParams) {
    var petId = $stateParams.id;
    var dataservice = common.dataservice;
    var me = common.Auth.getCurrentUser();
    return dataservice.getSinglePet(me, petId);
  }

}());
