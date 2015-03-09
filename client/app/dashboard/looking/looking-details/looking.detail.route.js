(function() {
  "use strict";

  angular
    .module('app.dashboard')
    .config(config);

  config.$inject=['$stateProvider', '$urlRouterProvider'];

  function config ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('dashboard.looking.detail', {
        url: '/detail/:id',
        templateUrl: 'app/dashboard/looking/looking-details/looking.detail.html',
        controller: 'LookingDetailCtrl',
        controllerAs:'detail',
        authenticate: true,
        resolve:{
          getLookingById:getLookingById
        }
      });
  }

  function getLookingById(common, $stateParams) {
    var dataservice = common.dataservice;
    var lookingId = $stateParams.id;
    return dataservice.getSingleLooking(lookingId);
  }


}());

