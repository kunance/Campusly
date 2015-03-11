(function () {
  "use strict";

  angular
    .module('RentedApp')
    .controller('PrerenderController', PrerenderController);

  PrerenderController.$inject = ['$scope'];

  function PrerenderController($scope) {
    $scope.seo = {
      pageTitle: 'Campusly',
      pageDescription: 'Secure off-campus community. Connect with verified students. Find off-campus housing. Meet new students - walk safely, share a ride, attend events.'
    };
  }

}());
