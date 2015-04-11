(function () {
  "use strict";

  angular
  .module('app.dashboard')
  .controller('EditProfileCtrl', EditProfileCtrl);

  EditProfileCtrl.$inject = ['$scope', '$cookieStore', 'common', 'FileUploader', 'currentUser', 'data', '$window'];

  function EditProfileCtrl($scope, $cookieStore, common, FileUploader, currentUser, data, $window) {
    var vm = this;
    /*
     *  Fetch all required data for controller from route resolve
     */
    vm.me = currentUser;
    vm.tempMe = Object.create(vm.me);
    vm.busy = data;//one promise witch need to be resolved in order to initialize controller (we use for show busy sign)
    vm.universitiesList = data[0];
    vm.tempEducation = data[1];
    vm.tempAddress = data[2];
    vm.submitted = false;
    vm.submittedAddress = false;
    vm.ddlYesNoSelect = [{value: true, text: 'Yes'}, {value: false, text: 'No'}];
    /*
     *  defining functions
     */
    vm.saveAddress = saveAddress;
    vm.saveEducation = saveEducation;
    vm.changePersonalData = changePersonalData;
    /*
     *  checking if user have current address and education, if no - create NEW, if yes - EDIT current
     */
    if(vm.tempAddress.streetAddress){
      var AddressStatus = vm.tempAddress.streetAddress;
      var addressId=AddressStatus.id;
    }
    if(vm.tempEducation.educationCenterName){
      var EducationStatus = vm.tempEducation.educationCenterName;
      var educationId = vm.tempEducation.id;
    }
    /*
     *  personal data management
     */
    function changePersonalData(userDataForm) {
      vm.submittedData = true;
      if(userDataForm.$valid) {
        common.Auth.updateUser(vm.tempMe)
        .then(function (user) {
         common.Auth.setCurrentUser(user);
         common.logger.success('Personal data successfully changed.');
       })
        .catch(function () {
          common.logger.error('Something went wrong. Changes are not saved.');
        });
      } else {
        common.logger.error('Please input all required fields');
      }
    }
    /*
     *  address data management
     */
    function saveAddress (addressForm,input) {
      vm.submittedAddress = true;
      if(addressForm.$valid){
        var zip = input.zip.toString();
        var trimmedZip = zip.replace(/\s+/g, '');
        input.zip = Number(trimmedZip);
        input.latitude = input.location.latitude;
        input.longitude = input.location.longitude;
        if(AddressStatus){
          common.dataservice.editAddress(vm.me.id, addressId, input, function () {
            common.logger.success('Address successfully updated');
          });
        }else{
          common.dataservice.addAddress(vm.me.id, input)
          .$promise
          .then(function () {
            common.logger.success('Address successfully added.');
          })
        }
      } else {
        common.logger.error('Please input all required fields');
      }
    }
    /*
     *  education data management
     */
    function saveEducation (input, form) {
      vm.submitted = true;
      if(form.$valid){
      input.universityId = input.educationCenterName.id;
      input.educationCenterName = input.educationCenterName.name;
      if(EducationStatus){
        common.dataservice.editEducation(vm.me.id, educationId, input, function () {
          common.logger.success('Education successfully updated');
          common.$state.reload();
        });
      }else {
        common.dataservice.addEducation(vm.me.id, input)
        .$promise
        .then(function () {
          common.logger.success('Education successfully added.');
          common.$state.reload();
        })
      }
    } else {
        common.logger.error('Please input all required fields');
      }
    }
    /*
     *  profile picture upload config
     */
    vm.uploader = new FileUploader();
    vm.uploader.url = '/api/users/' + vm.me.id + '/profileImages';
    vm.uploader.headers= {Authorization: 'Bearer ' + $cookieStore.get('token')};
    vm.uploader.onSuccessItem = function (itm,res,status,header) {
      vm.tempMe.profileImage = res.profileImage;
      common.logger.success('Uploaded successfully');
    };
    /*
     *  date picker options
     */
    $scope.open = function($event, number) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.datePickers[number]= true;
    };
    $scope.datePickers = {
      startDate: false,
      endDate:false
    };
    $scope.format = 'MM/dd/yyyy';
    $scope.clear = function () {
      $scope.dt = null;
    };
    /*
     *  updating user personal data in navbar
     */
    $scope.$watch(vm.me, function (newVal) {
      if (newVal !== undefined) {
        vm.tempMe = JSON.parse(JSON.stringify(newVal));
      }
    }, true);

    mixpanel.track('edit profile');
  }
}());
