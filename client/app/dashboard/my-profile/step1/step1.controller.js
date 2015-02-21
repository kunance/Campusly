(function () {
  "use strict";

  angular
    .module('app.account')
    .controller('Step1Ctrl', Step1Ctrl);

  Step1Ctrl.$inject = ['common', 'getUserInfo', 'getAddresses', 'getEducations', '$scope', 'ModalService'];

  function Step1Ctrl(common, getUserInfo, getAddresses, getEducations, $scope, ModalService) {
    var vm = this;
    vm.me = getUserInfo;
    vm.tempMe = Object.create(vm.me);
    vm.address = getAddresses;
    vm.education = getEducations;
    vm.addressModal=addressModal;

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


    function addressModal (data) {
      ModalService.addAddress(JSON.parse(JSON.stringify(data)), function(resp) {
        if (resp.mode === 'add') {
          var input = resp.streetAddress;
          var zip = input.zip.toString();
          var trimmedZip = zip.replace(/\s+/g, '');
          input.zip = Number(trimmedZip);
          common.dataservice.addAddress(vm.me.id, input).$promise
            .then(function (addr) {
              vm.address.push(addr);
              common.logger.success('Address successfully added.');
            })
            .catch(function () {
              common.logger.error('Error while saving address.');
            });
        } else if (resp.mode === 'delete') {
          var index = resp.index;
          var id = resp.addressData.id;
          common.dataservice.deleteAddress(vm.me.id, id, function () {
            vm.address.splice(index, 1);
            common.logger.success('Address successfully deleted.');
          });
        }

      })();
    }


  }

}());
