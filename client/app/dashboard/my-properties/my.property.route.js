(function() {
  "use strict";

  angular
    .module('app.dashboard')
    .config(config);

  config.$inject=['$stateProvider', '$urlRouterProvider'];

  function config ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('dashboard.myProperties', {
        url: '/myProperties',
        templateUrl: 'app/dashboard/my-properties/my.properties.html',
        controller: 'MyPropertiesCtrl',
        controllerAs:'myProperties',
        //resolve:{
        //  getAllProperties: getAllProperties
        //},
        authenticate: true
      });

    //function getAllProperties(common) {
    //  var dataservice = common.dataservice;
    //  var me = common.Auth.getCurrentUser();
    //  return dataservice.getAllProperties(me)
    //}
  }
}());
