(function () {
  "use strict";

  angular.module('RentedApp', [
    /*
     * Order is not important. Angular makes a
     * pass to register all of the modules listed
     */
    'app.core',
    'app.widgets',

    /*
     * Feature areas
     */
    'app.dashboard',
    'app.layout',
    'app.account'
  ])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
      $urlRouterProvider
        .otherwise('/dashboard');

      $locationProvider.html5Mode(true);
      $httpProvider.interceptors.push('authInterceptor');
      $locationProvider.hashPrefix('!');
    })

    .factory('authInterceptor', function($rootScope, $q, $cookieStore, $injector) {
      var state;
      return {
        // Add authorization token to headers
        request: function(config) {
          config.headers = config.headers || {};
          if ($cookieStore.get('token')) {
            config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
          }
          return config;
        },

        // Intercept 401s and redirect you to login
        responseError: function(response) {
          if (response.status === 401) {
            (state || (state = $injector.get('$state'))).go('login');
            // remove any stale tokens
            $cookieStore.remove('token');
            return $q.reject(response);
          }
          else {
            return $q.reject(response);
          }
        }
      };
    })
    .run(['$rootScope', '$state', 'Auth', '$stateParams', function($rootScope, $state, Auth, $stateParams) {
      // Redirect to login if route requires auth and you're not logged in
      $rootScope.$on('$stateChangeStart', function(event, next) {
        Auth.isLoggedIn(function(loggedIn) {
          if (next.authenticate && !loggedIn) {
            $state.go('login');
          }
        });
      });
    }]);

}());


