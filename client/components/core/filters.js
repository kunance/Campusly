/* global toastr:false, moment:false */
(function () {
  'use strict';

  angular
  .module('app.core')
    //.constant('moment', moment)
    .filter('boolean', , function() {
      return function(input) {
        return input == "true" ? "Yes" : "No"
      };
    };
  })();
