(function () {
  "use strict";

  angular
  .module('app.dashboard')
  .controller('editProfileCtrl', editProfileCtrl);

  editProfileCtrl.$inject = ['$scope', 'common', '$cookieStore', 'FileUploader', 'getUserInfo', 'getAddresses', 'getEducations', 'getAllRoommates', 'getAllUsers', 'getPets', 'getVehicles'];

  function editProfileCtrl($scope, common, $cookieStore, FileUploader, getUserInfo, getAddresses, getEducations, getAllRoommates, getAllUsers, getPets, getVehicles) {

    var vm = this;
    vm.changePersonalData = changePersonalData;

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

  }

}());
