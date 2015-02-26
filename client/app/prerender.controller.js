(function () {
  "use strict";

  angular
    .module('RentedApp')
    .controller('PrerenderController', PrerenderController);

  PrerenderController.$inject = ['$scope'];

  function PrerenderController($scope) {
    $scope.seo = {
      pageTitle: 'Rented Home',
      pageDescription: 'secure off-campus housing community'
    };
  }

}());
