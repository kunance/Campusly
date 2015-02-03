'use strict';

angular.module('baseCodeSqlApp')
  .factory('User', function ($resource) {
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
      }
	  });
  });
