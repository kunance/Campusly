(function () {
  "use strict";

  angular
    .module('app.footer')
    .controller('FooterCtrl', FooterCtrl);

  FooterCtrl.$inject = ['$scope', 'Auth'];

  function FooterCtrl($scope, Auth) {
    var vm = this;
    vm.brand = 'Campusly';
    //TODO implement footer Ctrl

    $scope.isLoggedIn = Auth.isLoggedIn;

  }

}());
