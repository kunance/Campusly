(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .controller('MyProfileCtrl', MyProfileCtrl);

  MyProfileCtrl.$inject = ['$scope', 'common', 'FileUploader'];

  function MyProfileCtrl($scope, common, FileUploader) {
    var vm = this;
    common.$state.go('dashboard.myProfile.step1');

    vm.tabs = getTabs();
    vm.tabIndex = 0;

    vm.selectedTab = 0;

    function getTabs() {
      return [
        { title:'Step 1', disabled: true, route: '.step1', active: false },
        { title:'Step 2', disabled: true, route: '.step2', active: false },
        { title:'Step 3', disabled: true, route: '.step3', active: false }
      ];
    }

    vm.tabSelected = function(index) {
      vm.selectedTab = index;
    };

    var isLastTab = function() {
      return vm.selectedTab === vm.tabs.length-1;
    };

    vm.isLastTab = isLastTab;

    vm.proceed = function() {
      if(!isLastTab()){
        vm.selectedTab++;
        vm.tabs[vm.selectedTab].active = true;
        common.$state.go('dashboard.myProfile'+vm.tabs[vm.selectedTab].route)
      }
    };


  }


}());
