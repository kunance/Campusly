(function () {
  "use strict";

  angular.module('app.core')
    .factory('Roommate', Roommate);

  Roommate.$inject = ['$resource'];
  function Roommate($resource) {
      return $resource('/api/users/:userId/roommates/:id', {userId:'@userId', id: '@id'},
        {
          getAllRoommates: {
            method: 'GET',
            isArray:true,
            params: {
              id:'all'
            }
          },
          getRequests: {
            method: 'GET',
            params: {
              id:'requests'
            }
          },
          editRoommate: {
            method: 'PUT'
          }
        }
      );
    }


}());
