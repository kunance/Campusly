(function () {
  "use strict";

  angular
    .module('RentedApp')
    .controller('NavbarCtrl', NavbarCtrl);

  NavbarCtrl.$inject = ['$scope', 'Auth', 'common', '$window', 'pubNubService', 'currentUserService', '$q'];

  function NavbarCtrl($scope, Auth, common, $window, pubNubService, currentUserService, $q) {
    if($window.FB) $scope.loadFB = $window.FB;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.isMailconfirmed = Auth.isMailconfirmed;

   //var temp;
   // currentUserService.userInfo()
   //   .then(function (data) {
   //     temp = data;
   //     console.log(temp);
   //   });


    /*
     * Slide menu toggle binding
     */
    $scope.checked = false; // This will be binded using the ps-open attribute

    $scope.toggle = function(){
      $scope.checked = !$scope.checked
    };

    /*
     * Code for slider menu
     */
    var vm = this;
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
