(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .controller('MyFavoritesCtrl', MyFavoritesCtrl);

  MyFavoritesCtrl.$inject = ['common'];

  function MyFavoritesCtrl(common) {
    var vm = this;
    vm.test = 'my favorites ctrl';
  }

}());
