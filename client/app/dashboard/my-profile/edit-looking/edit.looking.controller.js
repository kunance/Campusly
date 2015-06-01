(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .controller('EditLookingCtrl', EditLookingCtrl);

  EditLookingCtrl.$inject = ['$scope', 'common', 'data', '$stateParams', 'currentUser'];

  function EditLookingCtrl($scope, common, data, $stateParams, currentUser) {
    var vm = this;
    /*
     *  Fetch all required data for controller from route resolve
     */
      vm.me = currentUser;
      vm.tempLooking = data[0];
      vm.universitiesList = data[1];
      vm.education = data[2];
      var lookingId = $stateParams.id;
      vm.education.educationCenterName = vm.universitiesList[vm.education.universityId - 1];
    /*
     *  enables data binding to yes / no drop down values
     */
      vm.ddlYesNoSelect = [{value: true, text: 'Yes'}, {value: false, text: 'No'}];
      if(vm.education.educationCenterName){
        var EducationStatus = vm.education.educationCenterName;
        var educationId = vm.education.id;
      }
    /*
     *  date pickers options
     */
      $scope.datePickers = {
        startDate: false,
        endDate:false
      };
      vm.address = {};
      $scope.format = 'MM/dd/yyyy';
      $scope.clear = function () {
        $scope.dt = null;
      };

      $scope.open = function($event, number) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.datePickers[number]= true;
      };
    /*
     *  manage with looking
     */
      vm.saveChanges = function (input ,education) {
        common.dataservice.editLooking(vm.me.id, lookingId, input, function () {
          var educationInput = {};
          educationInput.universityId = education.educationCenterName.id;
          educationInput.educationCenterName = education.educationCenterName.name;
          if(EducationStatus){
            if(EducationStatus.name != vm.education.educationCenterName.name) {
              common.dataservice.editEducation(vm.me.id, educationId, educationInput, function () {
              }, function (err) {
                console.log('error while updating campus ', err)
              });
            }
          } else {
            common.dataservice.addEducation(vm.me.id, educationInput)
              .$promise
              .then(function () {
                console.log('Education successfully added.');
              }).catch(function (err) {
                console.log('error while adding campus ', err)
              })
          }
          common.logger.success('looking updated!');
          common.$state.go('lookingDetail', {param: lookingId, allIds:[lookingId]}, {reload: true});
        }, function (err) {
          console.log('error while updating looking', err);
        });
      };

    vm.deleteLooking = function () {
      var input = {activeLooking:false};
      common.dataservice.editLooking(vm.me.id, lookingId, input, function () {
        common.logger.success('Looking deleted');
        common.$state.go('dashboard', {}, {reload: true});
      })
    };

    mixpanel.track("edit a looking");
    mixpanel.people.increment('edit a looking');

}

}());
