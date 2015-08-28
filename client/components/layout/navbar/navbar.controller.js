(function () {
  "use strict";

  angular
    .module('RentedApp')
    .controller('NavbarCtrl', NavbarCtrl);

  NavbarCtrl.$inject = ['$scope', 'Auth', 'common', '$window', 'pubNubService', 'currentUserService', '$q'];

  function NavbarCtrl($scope, Auth, common, $window, pubNubService, currentUserService, $q) {
    if ($window.FB) $scope.loadFB = $window.FB;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.isMailconfirmed = Auth.isMailconfirmed;

    var vm = this;
    var debug = false;

    var user = Auth.getCurrentUser();

    if (user.email) {
      vm.notifs = {};
      vm.notifs.pmNotif = 0;
      vm.notifs.groupNotif = 0;


      vm.notifs.newPM = function () {
        vm.notifs.pmNotif = 1;
      };

      vm.notifs.clearPM = function(){
        vm.notifs.pmNotif = 0;
      };

      if(debug)console.log('initialized navbar controller');
      pubNubService.setNotifsAndScope(vm.notifs, $scope);
      pubNubService.setInMessages(0);
      pubNubService.notAppUpdateUser();
      pubNubService.notAppPrivateSubscribe();
      pubNubService.notAppCheckUnreadMessage(false);

      vm.newPrivateMessage = function(email, firstName, text){
        pubNubService.notAppPrivateMessage(email, firstName, text);
      }


    }


    /*
     * Slide menu toggle binding
     */
    $scope.checked = false; // This will be binded using the ps-open attribute

    $scope.toggle = function () {
      $scope.checked = !$scope.checked
    };

    /*
     * Code for slider menu
     */
    vm.tabs = [
      { title:"Home", sref:"dashboard", active: true },
      { title:"Messages", sref:"messages"},
      { title:"Students Around You", sref:"aroundYou"},
      { title:"Available Housing", sref:"rooms"},
      { title:"Looking for Roommates", sref:"looking"},
      { title:"My Profile", sref:"myProfile"},
      { title:"Settings", sref:"settings"},
      { title:"Logout", sref:"logout"}];

  }

}());
