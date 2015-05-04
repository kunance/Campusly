(function () {
  "use strict";

  angular
  .module('app.dashboard')
  .controller('EditProfileCtrl', EditProfileCtrl);

  EditProfileCtrl.$inject = ['$scope', '$cookieStore', 'common', 'FileUploader', 'currentUser', '$q', '$anchorScroll', '$stateParams', '$location'];

  function EditProfileCtrl($scope, $cookieStore, common, FileUploader, currentUser, $q, $anchorScroll, $stateParams, $location) {
    var vm = this;
    vm.me = currentUser;
    vm.tempMe = Object.create(vm.me);

    vm.uploader = new FileUploader();
    vm.uploader.url = '/api/users/' + vm.me.id + '/profileImages';
    vm.uploader.headers= {Authorization: 'Bearer ' + $cookieStore.get('token')};
    vm.uploader.onSuccessItem = function (itm,res,status,header) {
      vm.tempMe.profileImage = res.profileImage;
      common.logger.success('Uploaded successfully');
    };

    vm.universitiesList = common.dataservice.getAllUniversities();
    vm.tempEducation = common.dataservice.getAllEducations(currentUser.id);
    vm.tempAddress = common.dataservice.getAllAddresses(currentUser.id);
    var promises = [vm.universitiesList.$promise, vm.tempEducation.$promise, vm.tempAddress.$promise];
    $q.all(promises).then(function () {
      initializeEditProfileController()
    });

    function initializeEditProfileController() {
      vm.focus = $stateParams.focus;
      vm.submitted = false;
      vm.submittedAddress = false;
      vm.ddlYesNoSelect = [{value: true, text: 'Yes'}, {value: false, text: 'No'}];
      vm.tempEducation.educationCenterName = vm.universitiesList[vm.tempEducation.universityId - 1];
      if(vm.focus=='updateAddress') {
        $('#streetAddress').focus();
        $location.hash('scrollAddress');
        $anchorScroll();
      }
      if(vm.focus=='updateEducation') {
        $('#educationCenterName').focus();
        $location.hash('scrollEducation');
        $anchorScroll();
      }
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
          common.dataservice.editEducation(vm.me.id, educationId, input)
            .$promise
            .then(function (res) {
              common.logger.success('Education successfully updated');
              vm.tempEducation.educationCenterName = vm.universitiesList[res.universityId - 1];
            })
            .catch(function (err) {
              console.log('error updating education :', err);
            })
        } else {
          common.dataservice.addEducation(vm.me.id, input)
          .$promise
          .then(function (res) {
            common.logger.success('Education successfully added.');
            vm.tempEducation.educationCenterName = vm.universitiesList[res.universityId - 1];
          })
        }
      } else {
          common.logger.error('Please input all required fields');
        }
      }
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

      mixpanel.track("edit profile");
      mixpanel.people.increment('edit profile');
    }
  }
}());
