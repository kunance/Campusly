(function () {

  "use strict";

  angular
    .module('app.dashboard', [])
    .config(function($stateProvider) {
      $stateProvider
        .state('dashboard', {
          url: '/dashboard',
          templateUrl: 'app/dashboard/dashboard.html',
          controller: 'DashboardCtrl',
          controllerAs:'dashboard',
          authenticate: true,
          resolve:{
            getLookings:getLookings
          }
        });
    });

  function getLookings(common,$q) {
    var deffered = $q.defer();
    var dataservice = common.dataservice;
    var me = common.Auth.getCurrentUser();
    deffered.resolve(dataservice.getAllLookings(me));
    return deffered.promise;
  }


}());
