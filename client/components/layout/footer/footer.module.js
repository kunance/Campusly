(function () {
  "use strict";

  angular
    .module('app.footer', [])
    .config(config);

    config.$inject = ['$stateProvider'];
    function config($stateProvider) {
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
    $stateProvider
      .state('about', {
        url: '/about',
        templateUrl: 'components/layout/footer/about.html',
        controller: 'FooterCtrl',
        controllerAs: 'footer',
        authenticate: false
      });
  }

}());

