(function () {
  "use strict";

  angular.module('app.core')
    .factory('Roommate', function ($resource) {
      return $resource('/api/users/:userId/roommates/:id', {userId:'@userId', id: '@id'},
        {
          getAllRoommates: {
            method: 'GET',
            isArray:true,
            params: {
              id:'all'
            }
          },
          editRoommate: {
            method: 'PUT'
          }
        }
      );
    });


}());
