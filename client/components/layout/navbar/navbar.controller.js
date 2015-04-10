(function () {
  "use strict";

  angular
    .module('RentedApp')
    .controller('NavbarCtrl', NavbarCtrl);

  NavbarCtrl.$inject = ['$scope', 'Auth', 'common', '$window'];

  function NavbarCtrl($scope, Auth, common, $window) {
    if($window.FB) $scope.loadFB = $window.FB;
    //$scope.menu = [{
    //  'title': 'Home',
    //  'state': '/'
    //},{
    //  'title': 'Dashboard',
    //  'state': 'dashboard'
    //}];
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.isMailconfirmed = Auth.isMailconfirmed;
    $scope.status = {
      isopen: false
    };
    $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };

  }


}());
