(function () {
  "use strict";

  angular
    .module('app.account')
    .controller('Step1Ctrl', Step1Ctrl);

  Step1Ctrl.$inject = ['common', 'getUserInfo', 'getAddresses', 'getEducations', '$scope', 'FileUploader', '$cookieStore', '$http'];

  function Step1Ctrl(common, getUserInfo, getAddresses, getEducations, $scope, FileUploader, $cookieStore, $http) {
    var vm = this;
    vm.me = getUserInfo;
    vm.tempMe = Object.create(vm.me);
    vm.address = getAddresses;
    vm.education = getEducations;
    //vm.addressModal=addressModal;
    vm.changePersonalData=changePersonalData;
  //  vm.uploadMe = uploadMe;

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

    vm.uploader = new FileUploader();
    vm.uploader.url = '/api/users/' + vm.me.id + '/profileImages';
    vm.uploader.headers= {Authorization: 'Bearer ' + $cookieStore.get('token')};
    vm.uploader.onSuccessItem = function (itm,res,status,header) {
      vm.tempMe.profileImage = res.profileImage;
      console.log(vm.tempMe.profileImage);
      common.logger.success('successfully');
    }


    //function addressModal (data) {
    //  ModalService.addAddress(JSON.parse(JSON.stringify(data)), function(resp) {
    //    if (resp.mode === 'add') {
    //      var input = resp.streetAddress;
    //      var zip = input.zip.toString();
    //      var trimmedZip = zip.replace(/\s+/g, '');
    //      input.zip = Number(trimmedZip);
    //      common.dataservice.addAddress(vm.me.id, input).$promise
    //        .then(function (addr) {
    //          vm.address.push(addr);
    //          common.logger.success('Address successfully added.');
    //        })
    //        .catch(function () {
    //          common.logger.error('Error while saving address.');
    //        });
    //    } else if (resp.mode === 'delete') {
    //      var index = resp.index;
    //      var id = resp.addressData.id;
    //      common.dataservice.deleteAddress(vm.me.id, id, function () {
    //        vm.address.splice(index, 1);
    //        common.logger.success('Address successfully deleted.');
    //      });
    //    }
    //
    //  })();
    //}

    vm.upload= function () {
      $http.get('/api/users/23/profileImages', {params:{id:'/profileImages/userId.23/5b122326ce5f6f733885180e4d3c4fe9.png'}}).success(function (img) {
        return img;
      })
    }

    function changePersonalData(userDataForm) {
      if(userDataForm.$valid) {
        common.Auth.updateUser(vm.tempMe)
          .then(function (user) {
           // common.Auth.setCurrentUser(user);
            common.logger.success('Personal data successfully changed.');
          })
          .catch(function (err) {
            common.logger.error('Something went wrong. Changes are not saved.');
          });
      }
    }


  }

}());
