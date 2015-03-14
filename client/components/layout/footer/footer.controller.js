(function () {
  "use strict";

  angular
    .module('app.footer')
    .controller('FooterCtrl', FooterCtrl);

  FooterCtrl.$inject = ['$scope'];

  function FooterCtrl($scope) {
    var vm = this;
    vm.brand = 'Campusly';
    //TODO implement footer Ctrl
  }

}());
