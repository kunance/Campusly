(function () {
  "use strict";

  angular
    .module('app.account')
    .controller('AddPetCtrl', AddPetCtrl);

  AddPetCtrl.$inject = ['$scope', 'common'];

  function AddPetCtrl($scope, common) {
    var vm = this;
    var dataservice = common.dataservice;
    var tempPet = {};

    vm.me = common.Auth.getCurrentUser();

    vm.addNewPet = function (input) {
      dataservice.addPet(vm.me.id, {
        type: input.type,
        breed: input.breed,
        weightLbs: input.weight
      }).$promise
        .then(function () {
          console.log('new Pet added');
          common.$state.go('^',{},{reload:true});
        })
        .catch(function (err) {
          console.log('error while creating new Pet', err);
        });
    }

  }

}());
