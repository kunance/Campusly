(function () {
  "use strict";

  angular
  .module('app.dashboard')
  .controller('editProfileCtrl', editProfileCtrl);

  editProfileCtrl.$inject = ['$scope', 'common', '$cookieStore', 'FileUploader', 'getUserInfo', 'getAddresses', 'getEducations'];

  function editProfileCtrl($scope, common, $cookieStore, FileUploader, getUserInfo, getAddresses, getEducations, getAllRoommates) {

    var vm = this;

    vm.me = getUserInfo;
    vm.tempMe = Object.create(vm.me);
    
    vm.changePersonalData = changePersonalData;

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
          /* common.Auth.setCurrentUser(user); */
          common.logger.success('Personal data successfully changed.');
        })
        .catch(function (err) {
          common.logger.error('Something went wrong. Changes are not saved.');
        });
      }
    }

  }

}());
