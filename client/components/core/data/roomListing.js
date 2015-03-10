(function () {
  "use strict";

  angular.module('app.core')
    .factory('RoomListing', function ($resource) {
      return $resource('/api/users/:userId/rooms/:id', {userId: '@userId', id: '@id'},
        {
          'get':    {method:'GET'},
          'query':  {method:'GET', isArray:true},
          'create': {method: 'POST'},
          'remove': {method: 'DELETE'},
          'delete': {method: 'DELETE'},
          'edit': {
            method: 'PUT'
          }
        });
    });


}());

