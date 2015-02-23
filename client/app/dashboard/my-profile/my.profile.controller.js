(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .controller('MyProfileCtrl', MyProfileCtrl);

  MyProfileCtrl.$inject = ['$scope', 'common', 'FileUploader', 'getUserInfo', 'getAddresses', 'getEducations', '$cookieStore'];

  function MyProfileCtrl($scope, common, FileUploader, getUserInfo, getAddresses, getEducations, $cookieStore) {
    var vm = this;
    vm.me = getUserInfo;
    vm.tempMe = Object.create(vm.me);
    vm.address = getAddresses;
    vm.education = getEducations;
    vm.changePersonalData=changePersonalData;

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


    //common.$state.go('dashboard.myProfile.step1');

    //vm.tabs = getTabs();
    //vm.tabIndex = 0;
    //
    //vm.selectedTab = 0;
    //
    //function getTabs() {
    //  return [
    //    { title:'Step 1', disabled: true, route: '.step1', active: false },
    //    { title:'Step 2', disabled: true, route: '.step2', active: false },
    //    { title:'Step 3', disabled: true, route: '.step3', active: false }
    //  ];
    //}
    //
    //vm.tabSelected = function(index) {
    //  vm.selectedTab = index;
    //};
    //
    //var isLastTab = function() {
    //  return vm.selectedTab === vm.tabs.length-1;
    //};
    //
    //vm.isLastTab = isLastTab;
    //
    //vm.proceed = function() {
    //  if(!isLastTab()){
    //    vm.selectedTab++;
    //    vm.tabs[vm.selectedTab].active = true;
    //    common.$state.go('dashboard.myProfile'+vm.tabs[vm.selectedTab].route)
    //  }
    //};


  }


}());
