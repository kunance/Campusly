(function () {
    'use strict';

    /* Services */

    angular.module('myApp.services', [
        'service.login',
        'service.firebase',
        'service.changeEmail',
        'service.property'
    ])
    // put your services here!
    // .service('serviceName', ['dependency', function(dependency) {}]);
})();

