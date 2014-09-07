(function () {
    'use strict';

    /* Services */

    angular.module('myApp.services', [
        'service.login',
        'service.firebase',
        'service.changeEmail',
        'service.property',
        'service.tenant',
        'service.banner'
    ])
    // put your services here!
    // .service('serviceName', ['dependency', function(dependency) {}]);
})();

