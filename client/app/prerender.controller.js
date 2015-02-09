(function () {
  "use strict";

  angular
    .module('RentedApp')
    .controller('PrerenderController', PrerenderController);

  PrerenderController.$inject = ['$scope'];

  function PrerenderController($scope) {
    $scope.seo = {
      pageTitle: 'Welcome to rented co',
      pageDescription: 'Best place for renting'
    };
  }

}());
