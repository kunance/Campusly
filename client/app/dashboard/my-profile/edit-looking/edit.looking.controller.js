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
            common.dataservice.editEducation(vm.me.id, educationId, educationInput, function () {
              common.logger.success('Education successfully updated');
              common.$state.reload();
            });
          } else {
            common.dataservice.addEducation(vm.me.id, educationInput)
              .$promise
              .then(function () {
                common.logger.success('Education successfully added.');
                common.$state.reload();
              })
          }

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

    mixpanel.track('edit a looking');

}

}());
