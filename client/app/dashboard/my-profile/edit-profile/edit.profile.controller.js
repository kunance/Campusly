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
    vm.tempAddress = getAddresses[0];
    vm.tempEducation = getEducations[0];

    vm.changePersonalData = changePersonalData;
    vm.saveAddress = saveAddress;
    vm.saveEducation = saveEducation;

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

    function saveAddress (input) {
      console.log(input);
      var zip = input.zip.toString();
      var trimmedZip = zip.replace(/\s+/g, '');
      input.zip = Number(trimmedZip);
      if(vm.tempAddress.id){
        common.dataservice.editAddress(vm.me.id, vm.tempAddress.id, input, function () {
          common.logger.success('Address updated');
          common.$state.go('^',{},{reload:true});
        });
      }else{
        common.dataservice.addAddress(vm.me.id, input).$promise
        .then(function () {
          common.logger.success('Address successfully added.');
          common.$state.go('^',{},{reload:true});
        })
      }
    }

    function saveEducation (input) {
      if(vm.tempEducation.id){
        common.dataservice.editEducation(vm.me.id, vm.tempEducation.id, input, function () {
          common.$state.go('^',{},{reload:true});
          console.log('Education updated');
        });
      }else {
        common.dataservice.addEducation(vm.me.id, input).$promise
        .then(function () {
          common.logger.success('Education successfully added.');
        })
      }
    }
    
  }
}());
