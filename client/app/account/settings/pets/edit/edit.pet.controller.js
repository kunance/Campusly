(function () {
  "use strict";

  angular
    .module('app.account')
    .controller('EditPetCtrl', EditPetCtrl);

  EditPetCtrl.$inject = ['common', '$scope', '$stateParams', 'getPet'];

  function EditPetCtrl(common, $scope, $stateParams, getPet) {
    var vm = this;
    var dataservice = common.dataservice;
    var petId = $stateParams.id;
    vm.tempPet = getPet;

    vm.me = common.Auth.getCurrentUser();

  vm.savePet = function (input) {
    dataservice.editPet(vm.me.id, petId,{
      type:input.type,
      breed:input.breed,
      weightLbs:input.weightLbs
    }, function () {
      common.$state.go('^',{},{reload:true});
      console.log('Pet updated');
    })
  }

  }

}());
