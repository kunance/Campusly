angular.module('app.landing', []).config(function ($stateProvider) {
  'use strict';

  $stateProvider
    .state('landing', {
      url: '/',
      templateUrl: 'app/landing/landing.html',
      controller: 'LandingCtrl',
      controllerAs: 'landing',
      authenticate: false
    });
    //.state('landing.valuedetails', {
    //  url: '/valuedetails',
    //  templateUrl: 'app/landing/valuedetails.html',
    //  controller: 'ValueDetailsCtrl'
    //}).state('landing.howto', {
    //  url: '/howto',
    //  templateUrl: 'app/landing/howto.html',
    //  controller: 'HowToCtrl'
    //})
})
  .run(function ($rootScope) {
    //$rootScope.$on('$stateChangeStart', function (event, next, nextParams, current) {
    //  if (next.name === 'logout' && current && current.name && !current.authenticate) {
    //    next.referrer = current.name;
    //  }
    //});
  });
