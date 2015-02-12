(function () {
  "use strict";

  angular
    .module('app.account')
    .controller('PetCtrl', PetCtrl);

  PetCtrl.$inject = ['$scope', 'common', 'getPets'];

  function PetCtrl($scope, common, getPets) {
    var vm = this;
    var dataservice = common.dataservice;
    vm.listOfPets = getPets;

    vm.me = common.Auth.getCurrentUser();

    vm.deletePet= function (input) {
      var index= vm.listOfPets.indexOf(input);
      var id = input.id;
      dataservice.deletePet(vm.me.id, id, function () {
        vm.listOfPets.splice(index, 1);
      });

    }


  }

}());
