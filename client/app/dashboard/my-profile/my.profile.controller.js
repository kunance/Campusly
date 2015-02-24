(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .controller('MyProfileCtrl', MyProfileCtrl);

  MyProfileCtrl.$inject = ['$scope', 'common', 'FileUploader', 'getUserInfo', 'getAddresses', 'getEducations', '$cookieStore', 'getAllRoommates', 'getAllUsers'];

  function MyProfileCtrl($scope, common, FileUploader, getUserInfo, getAddresses, getEducations, $cookieStore, getAllRoommates, getAllUsers) {
    var vm = this;
    vm.me = getUserInfo;
    vm.tempMe = Object.create(vm.me);
    vm.address = getAddresses;
    vm.education = getEducations;
    vm.changePersonalData=changePersonalData;
    vm.users = getAllUsers;
    vm.roommates = getAllRoommates;


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



  }
}());
