(function () {
  "use strict";

  angular
    .module('app.account')
    .controller('Step1Ctrl', Step1Ctrl);

  Step1Ctrl.$inject = ['common', 'getUserInfo', '$scope'];

  function Step1Ctrl(common, getUserInfo, $scope) {
    var vm = this;
    vm.me = getUserInfo;
    vm.tempMe = Object.create(vm.me);
    vm.address = {};
    vm.education = {};

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

    //$scope.$on("$destroy", function(){
    //  vm.tempMe.userImage=vm.me.userImage;
    //  common.Auth.updateUser(vm.tempMe)
    //    .then(function () {
    //      console.log('User info updated');
    //      var zip = vm.address.streetAddress.zip.toString();
    //      var trimmedZip = zip.replace(/\s+/g, '');
    //      vm.address.streetAddress.zip = Number(trimmedZip);
    //      common.dataservice.addAddress(vm.me.id, vm.address.streetAddress).$promise
    //        .then(function () {
    //          console.log('new Address added');
    //          vm.education.graduation = false;
    //          common.dataservice.addEducation(vm.me.id, input).$promise
    //            .then(function () {
    //              console.log('new Education added');
    //              common.$state.go('^',{},{reload:true});
    //            })
    //            .catch(function (err) {
    //              console.log('error while creating new Education', err);
    //            });
    //        })
    //        .catch(function (err) {
    //          console.log('error while creating new Address', err);
    //        });
    //    })
    //    .catch(function (err) {
    //      console.log('error while updating user info', err);
    //    });
    //});

  }

}());
