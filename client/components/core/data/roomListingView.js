(function () {
  "use strict";

  angular.module('app.core')
    .factory('RoomListingView', function ($resource) {
      return $resource('/api/rooms/:id', {id: '@id'},
        {
          'get':    {method:'GET'},
          'query':  {method:'GET', isArray:true},
          'save':   {method: null},
          'remove': {method: null},
          'delete': {method: null}

        });
    });


}());


