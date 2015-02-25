(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .controller('AddPetCtrl', AddPetCtrl);

  AddPetCtrl.$inject = ['$scope', 'common'];

  function AddPetCtrl($scope, common) {
    var vm = this;
    var dataservice = common.dataservice;

    vm.me = common.Auth.getCurrentUser();

    vm.addNewPet = function (input) {
      dataservice.addPet(vm.me.id, input).$promise
        .then(function () {
          common.logger.success('Pet successfully updated.');
          common.$state.go('^',{},{reload:true});
        })
        .catch(function (err) {
          common.logger.error('Error while saving pet.');
        });
    }




  }

}());
