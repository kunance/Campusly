(function () {
  "use strict";

  angular
    .module('RentedApp')
    .controller('SubNavbarCtrl', SubNavbarCtrl);

  SubNavbarCtrl.$inject = ['$scope'];

  function SubNavbarCtrl($scope) {
    var vm = this;

    vm.tabs = [
      { title:"Home", sref:"dashboard", active: true },
      { title:"Around You", sref:"aroundYou"},
      { title:"Available Rooms", sref:"rooms"},
      { title:"Students Looking", sref:"looking"},
      { title:"My Profile", sref:"myProfile"}];
  }


}());

