(function () {
  'use strict';

  angular
    .module('app.core', [
    /*
     * Angular modules
     */
    'ngCookies', 'ngResource', 'ngSanitize',
    'ui.router', 'ui.bootstrap', 'ngAnimate', 'ngStorage',
    /*
     * Our reusable cross app code modules
     */
    'btford.socket-io'

    /*
     * 3rd Party modules
     */
  ]);
})();
