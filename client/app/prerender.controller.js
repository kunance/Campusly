(function () {
  "use strict";

  angular
    .module('RentedApp')
    .controller('PrerenderController', PrerenderController);

  PrerenderController.$inject = ['$scope'];

  function PrerenderController($scope) {
    $scope.seo = {
      pageTitle: 'Campusly',
      pageDescription: 'Your campus community. Chat with your university student services or students around you.'
    };
  }

}());
