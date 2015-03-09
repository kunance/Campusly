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
          getLookingById:getLookingById,
          getUserInfo: getUserInfo,
          getEducations: getEducations
        }
      });
  }

  function getLookingById(common, $stateParams) {
    var dataservice = common.dataservice;
    var lookingId = $stateParams.id;
    return dataservice.getSingleLooking(lookingId);
  }

  function getUserInfo(common, $q) {
    var deffered = $q.defer();
    deffered.resolve(common.Auth.getCurrentUser());
    return deffered.promise;
  }

  function getEducations(common, $q) {
    var deffered = $q.defer();
    var dataservice = common.dataservice;
    var me = common.Auth.getCurrentUser();
    deffered.resolve(dataservice.getAllEducations(me));
    return deffered.promise;
  }


}());

