// do NOT include braces because we are NOT creating a new module instance 'app.account' , we are just retrieving it
angular.module('app.account')
  .config(function ($stateProvider) {
    'use strict';

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('loginWithToken', {
        url: '/login/:sessionToken',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .state('logout', {
        url: '/logout?referrer',
        referrer: '/',
        template: '',
        controller: function ($state, Auth, $location) {
          var referrer = $state.params.referrer ||
            $state.current.referrer ||
            '/';
          Auth.logout();
          $location.path(referrer);
        }
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl',
        controllerAs: 'signup'
      });
  })
  .run(function ($rootScope) {
    $rootScope.$on('$stateChangeStart', function (event, next, nextParams, current) {
      if (next.name === 'logout' && current && current.name && !current.authenticate) {
        next.referrer = current.name;
      }
    });
  });

