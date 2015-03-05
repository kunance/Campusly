(function () {
  "use strict";

  angular
  .module('app.dashboard')
  .controller('EditProfileCtrl', EditProfileCtrl);

  EditProfileCtrl.$inject = ['$scope', 'common', 'getUniversities', 'getEducations'];

  function EditProfileCtrl($scope, common, getUniversities, getEducations) {
    var vm = this;
    vm.changePersonalData = changePersonalData;
    vm.changeEducationData = changeEducationData;
    vm.universitiesList = getUniversities;
    vm.educations = getEducations;
    vm.me = common.Auth.getCurrentUser();

    function changePersonalData(userDataForm) {
      if(userDataForm.$valid) {
        common.Auth.updateUser(vm.tempMe)
        .then(function (user) {
            common.logger.success('Personal data successfully changed.');
          })
        .catch(function (err) {
          common.logger.error('Something went wrong. Changes are not saved.');
        });
      }
    }

    function changeEducationData(form) {
    //  vm.educations[0].universityId = vm.educations[0].educationCenterName.id;
    //  vm.educations[0].educationCenterName = vm.educations[0].educationCenterName.name;
    //  vm.educations[0].graduation = false;
    // if (form.$valid) {
    //   if (vm.educations.length == 0) {
    //     common.dataservice.addEducation(vm.me.id, vm.educations[0]).$promise
    //       .then(function (education) {
    //         common.logger.success('Education successfully added.');
    //       })
    //       .catch(function (err) {
    //         common.logger.error('Error while saving education.');
    //       });
    //   } else {
    //     common.dataservice.editEducation(vm.me.id, vm.educations[0].id, vm.educations[0], function () {
    //       common.logger.success('Education successfully updated.');
    //     })
    //   }
    // }
    //
    }

  }

}());
