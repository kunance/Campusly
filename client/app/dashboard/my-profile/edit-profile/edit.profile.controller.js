(function () {
  "use strict";

  angular
  .module('app.dashboard')
  .controller('EditProfileCtrl', EditProfileCtrl);

  EditProfileCtrl.$inject = ['$scope', '$cookieStore', 'common', 'getUniversities', 'getEducations', 'getAddresses', 'FileUploader'];

  function EditProfileCtrl($scope, $cookieStore, common, getUniversities, getEducations, getAddresses, FileUploader) {
    var vm = this;

    vm.universitiesList = getUniversities;
    vm.educations = getEducations;

    vm.tempAddress = getAddresses[0];
    vm.tempEducation = getEducations[0];

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
           common.Auth.setCurrentUser(user);
          common.logger.success('Personal data successfully changed.');
        })
        .catch(function (err) {
          common.logger.error('Something went wrong. Changes are not saved.');
        });
      }
    }

    function saveAddress (input) {
      var zip = input.zip.toString();
      var trimmedZip = zip.replace(/\s+/g, '');
      input.zip = Number(trimmedZip);
      if(vm.tempAddress.id){
        common.dataservice.editAddress(vm.me.id, vm.tempAddress.id, input, function () {
          common.logger.success('Address updated');
        });
      }else{
        input.latitude = input.location.latitude;
        input.longitude = input.location.longitude;
        common.dataservice.addAddress(vm.me.id, input).$promise
        .then(function () {
          common.logger.success('Address successfully added.');
        })
      }
    }

    function saveEducation (input) {
      input.universityId = input.educationCenterName.id;
      input.educationCenterName = input.educationCenterName.name;
      if(vm.tempEducation.id){
        common.dataservice.editEducation(vm.me.id, vm.tempEducation.id, input, function () {
          common.$state.go('^',{},{reload:true});
        });
      }else {
        common.dataservice.addEducation(vm.me.id, input).$promise
        .then(function () {
          common.logger.success('Education successfully added.');
        })
      }
    }

    $scope.open = function($event, number) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.datePickers[number]= true;
    };

    $scope.$watch(vm.me, function (newVal) {
      if (newVal !== undefined) {
        vm.tempMe = JSON.parse(JSON.stringify(newVal));
      }
    }, true);


  }
}());
