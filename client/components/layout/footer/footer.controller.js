(function () {
  "use strict";

  angular
    .module('app.layout')
    .controller('FooterCtrl', FooterCtrl);

  FooterCtrl.$inject = ['$scope'];

  function FooterCtrl($scope) {
    var vm = this;
    vm.brand = 'Rented';
    //TODO implement footer Ctrl
  }

}());
