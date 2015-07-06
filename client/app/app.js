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
    'app.messages',
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
    .factory('requestNotificationChannel', requestNotificationChannel)
    .factory('authInterceptor', authInterceptor)
    .factory('busyInterceptor', busyInterceptor)
    .factory('requestInterceptor', requestInterceptor);

  configuration.$inject = ['$urlRouterProvider', '$locationProvider', '$httpProvider', '$uiViewScrollProvider'];
  function configuration($urlRouterProvider, $locationProvider, $httpProvider, $uiViewScrollProvider) {
    $urlRouterProvider
      .otherwise('/dashboard');
    $locationProvider.html5Mode(true);
    $uiViewScrollProvider.useAnchorScroll();
    $httpProvider.interceptors.push('authInterceptor');
    $httpProvider.interceptors.push('requestInterceptor');
    $httpProvider.interceptors.push('busyInterceptor');
    $locationProvider.hashPrefix('!');
  }

  authInterceptor.$inject = ['$q', '$cookieStore', '$injector'];
  function authInterceptor($q, $cookieStore, $injector) {
    var state;
    return {
      request: function (configuration) {
        configuration.headers = configuration.headers || {};
        if ($cookieStore.get('token')) {
          configuration.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return configuration;
      },

      responseError: function (response) {
        if (response.status === 401) {
          (state || (state = $injector.get('$state'))).go('login');
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  }

  requestNotificationChannel.$inject = ['$rootScope'];
  function requestNotificationChannel ($rootScope) {
    var _START_REQUEST_ = '_START_REQUEST_';
    var _END_REQUEST_ = '_END_REQUEST_';

    var requestStarted = function() {
      $rootScope.$broadcast(_START_REQUEST_);
    };
    var requestEnded = function() {
      $rootScope.$broadcast(_END_REQUEST_);
    };
    var onRequestStarted = function($scope, handler){
      $scope.$on(_START_REQUEST_, function(event){
        handler();
      });
    };
    var onRequestEnded = function($scope, handler){
      $scope.$on(_END_REQUEST_, function(event){
        handler();
      });
    };

    return {
      requestStarted:  requestStarted,
      requestEnded: requestEnded,
      onRequestStarted: onRequestStarted,
      onRequestEnded: onRequestEnded
    };
  }

  busyInterceptor.$inject = ['$q', 'requestNotificationChannel', '$injector'];
  function busyInterceptor ($q, requestNotificationChannel, $injector) {
    var $http;

    return {
      request: function (config) {
        requestNotificationChannel.requestStarted();
        return config;
      },

      response: function (response) {
        $http = $http || $injector.get('$http');
        if ($http.pendingRequests.length < 1) {
          requestNotificationChannel.requestEnded();
        }
        return response;
      },

      responseError: function(response) {
        $http = $http || $injector.get('$http');
        if ($http.pendingRequests.length < 1) {
          requestNotificationChannel.requestEnded();
        }
        return $q.reject(response);
      }
    };
  }

  requestInterceptor.$inject = ['$q'];
  function requestInterceptor($q) {
    return {
      'request': function (configuration) {
        configuration.timeout = 300000;
        return configuration;
      },

      'requestError': function (rejection) {
        return $q.reject(rejection);
      },

      'response': function (response) {
        return response;
      },

      'responseError': function (response) {
        return $q.reject(response);
      }
    };
  }

  run.$inject=['$rootScope', 'common', '$location'];
  function run($rootScope, common, $location) {
    $rootScope.$on('$stateChangeStart', function (event, next) {
      if (next.authenticate) {
        common.Auth.isLoggedInAsync(function (loggedIn) {
          if (!loggedIn) {
            $location.path('/login');
          }
        });
      }
    });
  }

}());

