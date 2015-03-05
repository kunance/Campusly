(function () {
  "use strict";

  angular
  .module('app.dashboard')
  .controller('EditProfileCtrl', EditProfileCtrl);

  EditProfileCtrl.$inject = ['$scope', 'common', 'getUniversities', 'getEducations', 'getAddresses'];

  function EditProfileCtrl($scope, common, getUniversities, getEducations, getAddresses) {
    var vm = this;

    vm.universitiesList = getUniversities;
    vm.educations = getEducations;
    
    vm.tempAddress = getAddresses[0];
    vm.tempEducation = educations[0];
    
    vm.me = common.Auth.getCurrentUser();
    vm.tempMe = Object.create(vm.me);

    vm.saveAddress = saveAddress;
    vm.saveEducation = saveEducation;
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
