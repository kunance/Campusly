(function () {
  "use strict";

  angular
  .module('app.dashboard')
  .controller('MyProfileCtrl', MyProfileCtrl);

  MyProfileCtrl.$inject = ['$scope', 'common', '$cookieStore', 'getUserInfo', 'getAddresses', 'getEducations', 'getAllRoommates', 'getAllUsers', 'getPets', 'getVehicles'];

  function MyProfileCtrl($scope, common, $cookieStore, getUserInfo, getAddresses, getEducations, getAllRoommates, getAllUsers, getPets, getVehicles) {
    
    var vm = this;
    vm.me = getUserInfo;
    vm.tempMe = Object.create(vm.me);
    vm.address = getAddresses;
    vm.education = getEducations;
    vm.users = getAllUsers;
    vm.roommates = getAllRoommates; //roomate info, his education info, his address info
    vm.pets = getPets;
    vm.vehicles = getVehicles;

    vm.showNewRoomate = false;
    vm.showAddonButtons = false;
    vm.showAddPet = false;
    vm.showAddVehicle = false;

    angular.forEach(vm.roommates, function (user) {
      user.addressInfo = user.relatedRoommateId.addresshistoryUsers;
    });

    $scope.datePickers = {
      EducationStartDate: false,
      EducationEndDate:false,
      graduationDate:false,
      AddresStartDate: false,
      AddressEndDate:false,
    };

    $scope.format = 'dd.MM.yyyy';
    
    $scope.clear = function () {
      $scope.dt = null;
    };

    $scope.open = function($event, number) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.datePickers[number]= true;
    };

    vm.toggleAddPet = function(){
      vm.showAddPet = true;
      vm.showAddVehicle = false;
      vm.showAddonButtons = false;
    };

    vm.toggleAddVehicle = function(){
      vm.showAddVehicle = true;
      vm.showAddPet = false;
      vm.showAddonButtons = false;
    };

    vm.toggleAddon = function(){
      vm.showAddonButtons = !vm.showAddonButtons;
      vm.showAddPet = false;
      vm.showAddVehicle = false;
    };

    vm.cancelAddAddon = function (){
      vm.showAddonButtons = false;
      vm.showAddPet = false;
      vm.showAddVehicle = false;
      vm.selectedPet = null;
      vm.selectedVehicle = null;
    };

    vm.toggleAddNewRoommate = function() {
      vm.showNewRoomate = !vm.showNewRoomate;
    }

    vm.addNewRoommate=function(input){
      if(!input) { return false; }
      var roommate = input.originalObject;
      common.dataservice.addRoommate(vm.me.id, roommate).$promise
      .then(function (room) {
        common.logger.success('successfully saved roommate')
      })
      .catch(function (err) {
        common.logger.error('Something went wrong. Roommate not saved.');
      });
    };

    vm.removeRoommate= function (roommate) {
      var index= vm.roommates.indexOf(roommate);
      var id = roommate.id;
      common. dataservice.deleteRoommate(vm.me.id, id, function () {
        vm.roommates.splice(index, 1);
        common.logger.success('Successfully removed roommate');
      })

    };

    vm.addNewPet = function (input) {
      common.dataservice.addPet(vm.me.id, input).$promise
      .then(function () {
        common.logger.success('Pet successfully created.');
        vm.pets.push(input);
        vm.cancelAddAddon();
      })
      .catch(function (err) {
        common.logger.error('Error while saving pet.');
      });
    }

    vm.editPet = function (index) {
      vm.selectedPet = index;
    }

    vm.deletePet= function (input) {
      var index= vm.pets.indexOf(input);
      var id = input.id;
      common.dataservice.deletePet(vm.me.id, id, function () {
        vm.pets.splice(index, 1);
        vm.selectedPet = null;
        common.logger.success('Pet deleted')
      });
    }

    vm.savePet = function (input) {
      common.dataservice.editPet(vm.me.id, input.id, input, function () {
        common.logger.success('Pet updated');
        vm.cancelAddAddon();
      })
    }

    /* Vehicles */

    vm.addNewVehicle = function (input) {
      common.dataservice.addVehicle(vm.me.id, input).$promise
      .then(function () {
        common.logger.success('Vehicle successfully updated.');
        vm.vehicles.push(input);
        vm.cancelAddAddon();
      })
      .catch(function (err) {
        common.logger.error('Error while saving vehicle.');
      });
    }

    vm.deleteVehicle= function (input) {
      var index= vm.listOfVehicles.indexOf(input);
      var id = input.id;
      common.dataservice.deleteVehicle(vm.me.id, id, function () {
        vm.listOfVehicles.splice(index, 1);
      });
    }

    vm.editVehicle = function (index) {
      vm.selectedVehicle = index;
    }

    vm.deleteVehicle= function (input) {
      var index= vm.vehicles.indexOf(input);
      var id = input.id;
      common.dataservice.deleteVehicle(vm.me.id, id, function () {
        vm.vehicles.splice(index, 1);
        vm.selectedVehicle = null;
        common.logger.success('Vehicle deleted')
      });
    }

    vm.saveVehicle = function (input) {
      common.dataservice.editVehicle(vm.me.id, input.id, input, function () {
        common.logger.success('Vehicle updated');
        vm.cancelAddAddon();
      })
    }

  }
}());
