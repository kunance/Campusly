(function () {
  "use strict";

  angular
    .module('app.account')
    .controller('NewVehicleCtrl', NewVehicleCtrl);

  NewVehicleCtrl.$inject = ['$scope','common'];

  function NewVehicleCtrl($scope,common) {
    var vm = this;
    var dataservice = common.dataservice;
    var tempVehicle = {};

    vm.me = common.Auth.getCurrentUser();

    vm.addNewVehicle = function (input) {
      dataservice.addVehicle(vm.me.id, input).$promise
        .then(function () {
          console.log('new Vehicle added');
          common.$state.go('^',{},{reload:true});
        })
        .catch(function (err) {
          console.log('error while creating new Vehicle', err);
        });
    }
  }

}());
