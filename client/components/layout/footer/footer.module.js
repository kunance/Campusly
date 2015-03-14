angular.module('app.footer', []).config(function ($stateProvider) {
  'use strict';

  $stateProvider
    .state('terms', {
      url: '/terms',
      templateUrl: 'components/layout/footer/terms.html',
      controller: 'FooterCtrl',
      controllerAs: 'footer',
      authenticate: false
    });

  $stateProvider
    .state('privacy', {
      url: '/privacy',
      templateUrl: 'components/layout/footer/privacy.html',
      controller: 'FooterCtrl',
      controllerAs: 'footer',
      authenticate: false
    });


});
