(function () {
  "use strict";

  angular.module('app.core')
    .factory('RoomListing', function ($resource) {
      return $resource('/api/users/:userId/rooms/:id', {userId: '@userId', id: '@id'},
        {
          editRoomListing: {
            method: 'PUT'
          }
        });
    });


}());

