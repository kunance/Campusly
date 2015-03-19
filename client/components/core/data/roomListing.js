(function () {
  "use strict";

  angular
    .module('app.core')
    .factory('RoomListing', RoomListing);

  RoomListing.$inject = ['$resource'];
  function RoomListing($resource) {
      return $resource('/api/users/:userId/rooms/:id', {userId: '@userId', id: '@id'},
        {
          'get':    {method:'GET'},
          'query':  {method:'GET', isArray:true},
          'create': {method: 'POST'},
          'delete': {method: 'DELETE'},
          'edit': {
            method: 'PUT'
          }
        });
    }


}());

