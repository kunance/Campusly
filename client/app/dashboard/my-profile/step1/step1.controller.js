(function () {
  "use strict";

  angular
    .module('app.account')
    .controller('Step1Ctrl', Step1Ctrl);

  Step1Ctrl.$inject = ['common', 'getUserInfo', 'getAddresses', 'getEducations', '$scope', 'FileUploader', '$cookieStore', '$http'];

  function Step1Ctrl(common, getUserInfo, getAddresses, getEducations, $scope, FileUploader, $cookieStore, $http) {
    var vm = this;
    vm.me = getUserInfo;
    vm.tempMe = Object.create(vm.me);
    vm.address = getAddresses;
    vm.education = getEducations;
    //vm.addressModal=addressModal;
    vm.changePersonalData=changePersonalData;
  //  vm.uploadMe = uploadMe;

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
      console.log(vm.tempMe.profileImage);
      common.logger.success('successfully');
    }


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


  }

}());
