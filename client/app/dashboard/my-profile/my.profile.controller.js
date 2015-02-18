(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .controller('MyProfileCtrl', MyProfileCtrl);

  MyProfileCtrl.$inject = ['$scope', 'common', 'FileUploader'];

  function MyProfileCtrl($scope, common, FileUploader) {
    var vm = this;
    //common.$state.go('dashboard.myProfile.step1');

    vm.buttons = getButtons();
    vm.tabs = getTabs();
    vm.tabIndex = 0;

    function getTabs() {
      return [
        { title:'Step 1', disabled: true, route: '.step1', active: false },
        { title:'Step 2', disabled: true, route: '.step2', active: false },
        { title:'Step 3', disabled: true, route: '.step3', active: false }
      ];
    }

    function getButtons() {
      return [
        {
          previous: {show: false, text: ''},
          next: {show: true, text: 'Proceed to step 2'}
        },{
          previous: {show: true, text: 'Back to step 1' },
          next: {show: false, text: 'Proceed to step 2' }
        },{
          previous: {show: false, text: 'Back to step 2' },
          next: {show: true, text: 'Done' }
        }
      ];
    }

  vm.selectedTab = 0;

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
      }
    };



    $scope.$on("$stateChangeSuccess", function() { // Keep the right tab highlighted if the URL changes.
      //vm.tabs.forEach(function(tab) {
      //  if (vm.active(tab.route)) {
      //    tab.active = true;
      //    tab.disabled = false;
      //    vm.tabIndex = vm.tabs.indexOf(tab);
      //  } else {
      //    tab.active = false;
      //    tab.disabled = true;
      //  }
      //});
    });
  }


}());
