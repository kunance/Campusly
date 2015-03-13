(function () {
  "use strict";

  angular
  .module('app.dashboard')
  .controller('MyProfileCtrl', MyProfileCtrl);

  MyProfileCtrl.$inject = ['$scope', 'common', 'currentUser', 'getAddresses', 'getEducations', 'getAllRoommates', 'getAllUsers', 'getPets', 'getVehicles'];

  function MyProfileCtrl($scope, common, currentUser, getAddresses, getEducations, getAllRoommates, getAllUsers, getPets, getVehicles) {
    var vm = this;
    /*
     *  Fetch all required data for controller from route resolve
     */
    vm.me = currentUser;
    vm.tempMe = Object.create(vm.me);
    vm.address = getAddresses;
    vm.education = getEducations;
    vm.users = getAllUsers;
    vm.roommates = getAllRoommates; //roommate info, his education info, his address info
    vm.pets = getPets;
    vm.vehicles = getVehicles;

    console.log('current roommates: ',vm.roommates);
    /*
     *  showing/hiding partials
     */
    vm.showNewRoomate = false;
    vm.showPetAddonButtons = false;
    vm.showRoommatesAddonButtons = false;
    vm.showAddPet = false;
    vm.showAddVehicle = false;

    vm.toggleAddPet = function(){
      vm.showAddPet = true;
      vm.showAddVehicle = false;
      vm.showPetAddonButtons = false;
    };

    vm.toggleAddRoommate = function(){
      vm.showAddRoommate = true;
      vm.showInviteRoomate = false;
      vm.showRoommatesAddonButtons = false;
    };

    vm.toggleRoommatesAddon = function(){
      vm.showRoommatesAddonButtons = !vm.showRoommatesAddonButtons;
      vm.showAddRoommate = false;
      vm.showInviteRoomate = false;
    };

    vm.togglePetAddon = function(){
      vm.showPetAddonButtons = !vm.showPetAddonButtons;
      vm.showAddPet = false;
      vm.showAddVehicle = false;
    };

    vm.cancelPetAddAddon = function (a){
      if(a){
      vm.showPetAddonButtons = true;}
      if(!a){
      vm.showPetAddonButtons = false;}
      vm.showAddPet = false;
      vm.showAddVehicle = false;
      vm.selectedPet = null;
      vm.selectedVehicle = null;
    };

    vm.cancelVehicleAddAddon = function (a){
      if(a){
        vm.showPetAddonButtons = true;}
      if(!a){
        vm.showPetAddonButtons = false;}
      vm.showAddPet = false;
      vm.showAddVehicle = false;
      vm.selectedPet = null;
      vm.selectedVehicle = null;
    };

    vm.cancelRoommateAddAddon = function (){
      vm.showRoommateAddonButtons = false;
      vm.showAddRoommate = false;
      vm.showInviteRoommate = false;
    };

    vm.toggleAddVehicle = function(){
      vm.showAddVehicle = true;
      vm.showAddPet = false;
      vm.showPetAddonButtons = false;
    };
    /*
     *  roommate management
     */
    vm.addNewRoommate = function(input){
      if(!input) { return false; }
      var roommate = input.originalObject;
      common.dataservice.addRoommate(vm.me.id, roommate)
      .$promise
      .then(function (data) {
        common.logger.success('Roommate successfully added!');
        vm.roommates.push(data);
        common.$state.reload();
        vm.cancelRoommateAddAddon();
      })
      .catch(function (err) {
        common.logger.error('Something went wrong. Roommate not saved.');
      });
    };

    vm.removeRoommate = function (roommate) {
      var index = vm.roommates.indexOf(roommate);
      var roommateId = roommate.id;
      common.dataservice.deleteRoommate(vm.me.id, roommateId, function () {
        vm.roommates.splice(index, 1);
        common.logger.success('Roommate successfully deleted.');
      })

    };
    /*
     *  pet management
     */
    vm.addNewPet = function (input) {
      common.dataservice.addPet(vm.me.id, input)
      .$promise
      .then(function () {
        common.logger.success('Pet successfully created.');
        vm.pets.push(input);
        common.$state.reload();
        vm.cancelPetAddAddon();
      })
      .catch(function (err) {
        common.logger.error('Error while saving pet.');
      });
    };

    vm.editPet = function (index) {
      vm.selectedPet = index;
    };

    vm.deletePet= function (input) {
      var index= vm.pets.indexOf(input);
      var petId = input.id;
      common.dataservice.deletePet(vm.me.id, petId, function () {
        vm.pets.splice(index, 1);
        vm.selectedPet = null;
        common.logger.success('Pet deleted')
      });
    };

    vm.savePet = function (input) {
      var petId = input.id;
      common.dataservice.editPet(vm.me.id, petId, input, function () {
        common.logger.success('Pet updated');
        vm.cancelPetAddAddon();
      })
    };
    /*
     *  vehicle management
     */
    vm.addNewVehicle = function (input) {
      common.dataservice.addVehicle(vm.me.id, input)
      .$promise
      .then(function () {
        common.logger.success('Vehicle successfully updated.');
        vm.vehicles.push(input);
        common.$state.reload();
        vm.cancelPetAddAddon();
      })
      .catch(function (err) {
        common.logger.error('Error while saving vehicle.');
      });
    };

    vm.editVehicle = function (index) {
      vm.selectedVehicle = index;
    };

    vm.deleteVehicle= function (input) {
      var index= vm.vehicles.indexOf(input);
      var vehicleId = input.id;
      common.dataservice.deleteVehicle(vm.me.id, vehicleId, function () {
        vm.vehicles.splice(index, 1);
        vm.selectedVehicle = null;
        common.logger.success('Vehicle deleted')
      });
    };

    vm.saveVehicle = function (input) {
      var vehicleId = input.id;
      common.dataservice.editVehicle(vm.me.id, vehicleId, input, function () {
        common.logger.success('Vehicle updated');
        vm.cancelPetAddAddon();
      })
    };
    /*
     *  date picker options
     */
    $scope.datePickers = {
      EducationStartDate: false,
      EducationEndDate:false,
      graduationDate:false,
      AddresStartDate: false,
      AddressEndDate:false
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
  }
}());
