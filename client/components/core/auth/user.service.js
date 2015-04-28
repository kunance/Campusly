(function () {
  "use strict";

  angular.module('app.core')
    .factory('UserResource', UserResource);

  UserResource.$inject = ['$resource'];
  function UserResource($resource) {
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
          aroundMe: {
            method: 'GET',
            isArray:true,
            params: {
              controller:'around'
            }
          },
          get: {
            method: 'GET',
            params: {
              id:'me'
            }
          },
          getByToken: {
            method: 'GET',
            params: {
              id:'byToken'
            }
          },
          changeProfileImage: {
            method: 'POST',
            params: {
              controller:'profileImage'
            }
          },
          changeInfo: {
            method: 'PUT',
            params: {
              controller:'info'
            }
          },
          getCurrentAddressAndUniv: {
            method: 'GET',
            params: {
              controller:'currentAddressAndUniv'
            }
          }
        });
    }


}());

