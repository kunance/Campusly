(function () {
  'use strict';

  angular
    .module('app.core')
    .factory('common', common);

  common.$inject = ['$location', '$q', '$rootScope', '$timeout', /*'logger',*/ 'Modal', /*'language', 'gettext', 'dataservice',*/ 'Auth'];

  function common($location, $q, $rootScope, $timeout, /*logger,*/ Modal, /*language, gettext, dataservice, */Auth) {
    var throttles = {};

    var service = {
      // common angular dependencies
      $broadcast: $broadcast,
      $emit: $emit,
      $on: $on,
      $q: $q,
      $timeout: $timeout,
      $watch: $watch,
      // generic
    //  createSearchThrottle: createSearchThrottle,
    //  debouncedThrottle: debouncedThrottle,
      isNumber: isNumber,
      isSameDate: isSameDate,
      isNullOrUndefined: isNullOrUndefined,
    //  logger: logger, // for accessibility
   //   language: language,
      translations: translations(),
    //  dataservice: dataservice,
      Auth: Auth,
      Modal: Modal,
      replaceLocationUrlGuidWithId: replaceLocationUrlGuidWithId,
      textContains: textContains
    };

    return service;
    //////////////////////

    function translations () {
      return {
        getTranslated: function (text) {
          return gettext(text);
        }
      };
    }

    function $broadcast() {
      return $rootScope.$broadcast.apply($rootScope, arguments);
    }

    function $emit() {
      return $rootScope.$emit.apply($rootScope, arguments);
    }

    function $on() {
      return $rootScope.$on.apply($rootScope, arguments);
    }

    function $watch() {
      return $rootScope.$watch.apply($rootScope, arguments);
    }

    function createSearchThrottle(viewmodel, list, filteredList, filter, delay) {
      // After a delay, search a viewmodel's list using
      // a filter function, and return a filteredList.

      // custom delay or use default
      delay = +delay || 300;
      // if only vm and list parameters were passed, set others by naming convention
      if (!filteredList) {
        // assuming list is named sessions, filteredList is filteredSessions
        filteredList = 'filtered' + list[0].toUpperCase() + list.substr(1).toLowerCase(); // string
        // filter function is named sessionFilter
        filter = list + 'Filter'; // function in string form
      }

      // create the filtering function we will call from here
      var filterFn = function () {
        // translates to ...
        // vm.filteredSessions
        //      = vm.sessions.filter(function(item( { returns vm.sessionFilter (item) } );
        viewmodel[filteredList] = viewmodel[list].filter(function (item) {
          return viewmodel[filter](item);
        });
      };

      return (function () {
        // Wrapped in outer IIFE so we can use closure
        // over filterInputTimeout which references the timeout
        var filterInputTimeout;

        // return what becomes the 'applyFilter' function in the controller
        return function (searchNow) {
          if (filterInputTimeout) {
            $timeout.cancel(filterInputTimeout);
            filterInputTimeout = null;
          }
          if (searchNow || !delay) {
            filterFn();
          } else {
            filterInputTimeout = $timeout(filterFn, delay);
          }
        };
      })();
    }

    function debouncedThrottle(key, callback, delay, immediate) {
      // Perform some action (callback) after a delay.
      // Track the callback by key, so if the same callback
      // is issued again, restart the delay.

      var defaultDelay = 1000;
      delay = delay || defaultDelay;
      if (throttles[key]) {
        $timeout.cancel(throttles[key]);
        throttles[key] = undefined;
      }
      if (immediate) {
        callback();
      } else {
        throttles[key] = $timeout(callback, delay);
      }
    }

    function isNumber(val) {
      // negative or positive
      return (/^[-]?\d+$/).test(val);
    }

    function isSameDate(date1, date2) {
      return (date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate());
    }

    function isNullOrUndefined(val) {
      return (!angular.isDefined(val) || val === null);
    }

    function replaceLocationUrlGuidWithId(id) {
      // If the current Url is a Guid, then we replace
      // it with the passed in id. Otherwise, we exit.
      var currentPath = $location.path();
      var slashPos = currentPath.lastIndexOf('/', currentPath.length - 2);
      var currentParameter = currentPath.substring(slashPos - 1);

      if (isNumber(currentParameter)) {
        return;
      }

      var newPath = currentPath.substring(0, slashPos + 1) + id;
      $location.path(newPath);
    }

    function textContains(text, searchText) {
      return text && -1 !== text.toLowerCase().indexOf(searchText.toLowerCase());
    }
  }
})();

