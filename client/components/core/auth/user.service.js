(function () {
  "use strict";

  angular.module('app.core')
    .factory('UserResource', function ($resource) {
      return $resource('/api/users/:id/:controller', {
          id: '@id'
        },
        {
          changePassword: {
            method: 'PUT',
            params: {
              controller:'password'
            }
          },
          get: {
            method: 'GET',
            params: {
              id:'me'
            }
          },
          changeInfo: {
            method: 'PUT',
            params: {
              controller:'info'
            }
          }
        });
    });


}());

