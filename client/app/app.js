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
    'app.account',
    'app.landing',
    'app.rooms',
    'app.addRoom',
    'app.editRoom',
    'app.roomDetail',
    'app.footer'
  ])
    .config(configuration)
    .run(run)
    .factory('authInterceptor', authInterceptor);

  configuration.$inject = ['$urlRouterProvider', '$locationProvider', '$httpProvider', '$uiViewScrollProvider'];
  function configuration($urlRouterProvider, $locationProvider, $httpProvider, $uiViewScrollProvider) {
    $urlRouterProvider
      .otherwise('/dashboard');
    $locationProvider.html5Mode(true);
    $uiViewScrollProvider.useAnchorScroll();
    $httpProvider.interceptors.push('authInterceptor');
    $locationProvider.hashPrefix('!');
    $httpProvider.interceptors.push(requestInterceptor);
  }

  authInterceptor.$inject = ['$rootScope', '$q', '$cookieStore', '$injector', '$location'];
  function authInterceptor($rootScope, $q, $cookieStore, $injector, $location) {
    var state;
    return {
      // Add authorization token to headers
      request: function (configuration) {
        configuration.headers = configuration.headers || {};
        if ($cookieStore.get('token')) {
          configuration.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return configuration;
      },

      // Intercept 401s and redirect you to login
      responseError: function (response) {
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
  }

  requestInterceptor.$inject = ['$q'];
  function requestInterceptor($q) {
    return {
      'request': function (configuration) {
        // do something on success
        // start with 30 seconds for default timeout value when calling any network dependent service such as db or elastic search
        configuration.timeout = 300000;
        return configuration;
      },

      'requestError': function (rejection) {
        // do something on error
//				if (canRecover(rejection)) {
//					return responseOrNewPromise
//				}
        return $q.reject(rejection);
      },

      'response': function (response) {
        // do something on success
        return response;
      },

      'responseError': function (response) {
        //console.log('RESPONSE ERROR: ', response);
        return $q.reject(response);
      }
    };
  }

  run.$inject=['$rootScope', '$state', 'Auth', '$stateParams', 'common', '$location'];
  function run($rootScope, $state, Auth, $stateParams, common, $location) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      //console.log('Current state: ', $state.current.name);
      //console.log('Event: ', event);
      //console.log('Next: ', next);
      //  common.logger.info('Navigating to ' + next.url); // Used to help understand where we navigate to
      if (next.authenticate) {
        common.Auth.isLoggedInAsync(function (loggedIn) {
          if (!loggedIn) {
            $location.path('/');
            // $state.go('/');
          }
        });
      }
    });
  }

}());

