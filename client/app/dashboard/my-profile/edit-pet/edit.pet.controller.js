(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .controller('EditPetCtrl', EditPetCtrl);

  EditPetCtrl.$inject = ['common', '$scope', '$stateParams', 'getPet'];

  function EditPetCtrl(common, $scope, $stateParams, getPet) {
    var vm = this;
    var dataservice = common.dataservice;
    var petId = $stateParams.id;
    vm.tempPet = getPet;

    vm.me = common.Auth.getCurrentUser();

  vm.savePet = function (input) {
    dataservice.editPet(vm.me.id, petId, input, function () {
      common.logger.success('Pet updated');
      common.$state.go('^',{},{reload:true});
    })
  }

  vm.deletePet= function () {
    dataservice.deletePet(vm.me.id, petId, function () {
      common.$state.go('^',{},{reload:true});
      common.logger.success('Pet deleted');
    });
  }

  }

}());
