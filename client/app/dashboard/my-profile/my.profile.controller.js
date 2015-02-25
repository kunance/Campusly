(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .controller('MyProfileCtrl', MyProfileCtrl);

  MyProfileCtrl.$inject = ['$scope', 'common', '$cookieStore', 'FileUploader', 'getUserInfo', 'getAddresses', 'getEducations', 'getAllRoommates', 'getAllUsers', 'getPets'];

  function MyProfileCtrl($scope, common, $cookieStore, FileUploader, getUserInfo, getAddresses, getEducations, getAllRoommates, getAllUsers, getPets) {
    var vm = this;
    vm.me = getUserInfo;
    vm.tempMe = Object.create(vm.me);
    vm.address = getAddresses;
    vm.education = getEducations;
    vm.users = getAllUsers;
    vm.roommates = getAllRoommates;
    vm.pets = getPets;
    vm.changePersonalData = changePersonalData;

    angular.forEach(vm.roommates, function (user) {
      user.addressInfo = user.relatedRoommateId.addresshistoryUsers;
    });

    console.log(vm.pets);

    $scope.datePickers = {
      startDate: false,
      endDate:false,
      graduationDate:false
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

    vm.uploader = new FileUploader();
    vm.uploader.url = '/api/users/' + vm.me.id + '/profileImages';
    vm.uploader.headers= {Authorization: 'Bearer ' + $cookieStore.get('token')};
    vm.uploader.onSuccessItem = function (itm,res,status,header) {
      vm.tempMe.profileImage = res.profileImage;
      common.logger.success('Uploaded successfully');
    };

    function changePersonalData(userDataForm) {
      if(userDataForm.$valid) {
        common.Auth.updateUser(vm.tempMe)
          .then(function (user) {
            // common.Auth.setCurrentUser(user);
            common.logger.success('Personal data successfully changed.');
          })
          .catch(function (err) {
            common.logger.error('Something went wrong. Changes are not saved.');
          });
      }
    }

     vm.addNewRoommate=function(input){
     if(!input) {return false;}
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

    }

    vm.deletePet= function (input) {
      var index= vm.pets.indexOf(input);
      var id = input.id;
      common.dataservice.deletePet(vm.me.id, id, function () {
        vm.pets.splice(index, 1);
        common.logger.success('Pet deleted')
      });

    }


  }
}());
