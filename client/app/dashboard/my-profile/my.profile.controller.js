(function () {
  "use strict";

  angular
  .module('app.dashboard')
  .controller('MyProfileCtrl', MyProfileCtrl);

  MyProfileCtrl.$inject = ['$scope', 'common', 'currentUser', '$q', '$window', 'UserResource', 'RoomListing'];

  function MyProfileCtrl($scope, common, currentUser, $q, $window, UserResource, RoomListing) {
    var vm = this;
    vm.me = currentUser;
    vm.tempMe = Object.create(vm.me);
    vm.userLookings = common.dataservice.getAllLookings(currentUser.id);
    vm.myRoomListings = RoomListing.query({userId: currentUser.id});
    vm.education  = common.dataservice.getAllEducations(currentUser.id);
    vm.address    = common.dataservice.getAllAddresses(currentUser.id);
    vm.users      = UserResource.query();
    vm.roommates  = common.dataservice.getAllRoommates(currentUser.id);
    vm.pets       = common.dataservice.getAllPets(currentUser.id);
    vm.vehicles   = common.dataservice.getAllVehicles(currentUser.id);
    var promises  = [vm.education.$promise, vm.address.$promise, vm.users.$promise, vm.roommates.$promise, vm.pets.$promise, vm.vehicles.$promise];
    $q.all(promises).then(function () {
      initializeMyProfileController()
    });

    function initializeMyProfileController() {
      vm.confirmed = 0;
      vm.unconfirmed = 0;
      angular.forEach(vm.roommates, function (roommate) {
        roommate.confirmed?vm.confirmed++:vm.unconfirmed++;
      });
      vm.requests = 0;

      /*
       *  lookings
       */
      vm.myLookingsIds = [];
      angular.forEach(vm.userLookings, function (myLookings) {
        vm.myLookingsIds.push(myLookings.id);
      });

      /*
       *  available housing
       */
      vm.myRoomListingsIds = [];
      angular.forEach(vm.myRoomListings, function (myRoom) {
        vm.myRoomListingsIds.push(myRoom.id);
      });

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
        vm.showRoommatesAddonButtons = true;
      };

       vm.toggleInviteRoomate = function(){
        vm.showAddRoommate = false;
        vm.showInviteRoomate = true;
        vm.showRoommatesAddonButtons = true;
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

     vm.cancelRoommateInviteAddon = function (){
       vm.showRoommateAddonButtons = false;
       vm.showAddRoommate = false;
       vm.showInviteRoomate = false;
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
        input.originalObject.roommateId = input.originalObject.id;
        var roommate = input.originalObject;
        common.dataservice.addRoommate(vm.me.id, roommate)
        .$promise
        .then(function (data) {
          common.logger.success('Roommate successfully added!');
          common.$state.transitionTo('myProfile',{},{reload: true, inherit: false, notify: true});
          vm.roommates.push(data);
        })
        .catch(function (err) {
          common.logger.error('Something went wrong. Roommate not saved.');
        });
      };

      vm.approveRoommate = function(input){
        if(!input) { return false; }
        var temp = input.userId;
        input.userId = input.roommateId;
        input.roommateId = temp;
        console.log(input);
        common.dataservice.addRoommate(input.userId, input)
          .$promise
          .then(function (data) {
            common.logger.success('Roommate approved!');
            common.$state.reload();
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
          common.$state.reload();
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
       *  fetching user facebook profile from OAuth
       */
      $scope.loginOauth = function (provider) {
        $window.location.href = '/auth/' + provider;
      };

      vm.unlinkAccount= function () {
        if(vm.tempMe.facebook) {
          vm.tempMe.facebook = null;
          common.Auth.updateUser(vm.tempMe)
            .then(function (user) {
              common.logger.success('Account unlinked.');
            })
            .catch(function (err) {
              common.logger.error('Something went wrong. Changes are not saved.');
            });
        } else {
          return false;
        }
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
      $scope.format = 'MM/dd/yyyy';
      $scope.clear = function () {
        $scope.dt = null;
      };
      $scope.open = function($event, number) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.datePickers[number]= true;
      };

      function orderSliderButtons() {
        setTimeout(function () {
          $(".slider").each(function (index) {
            var slider = $(".slider").eq(index);
            var dotsX = parseInt(slider.find(".slick-dots").css("left"));
            var dotsSize = parseInt(slider.find(".slick-dots").css("width"));
            var nextBtnX = dotsX + dotsSize + 10;
            slider.find(".slick-next").css("left", nextBtnX);
          });
        }, 1000);
      }

      $(window).resize(function () {
        orderSliderButtons();
      });

      angular.element(document).ready(function () {
        orderSliderButtons();
      });

      mixpanel.track("view profile");
      mixpanel.people.increment('view profile');
    }
  }
}());
