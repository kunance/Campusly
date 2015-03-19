(function () {
  "use strict";

  angular
    .module('app.core')
    .factory('RoomListingView', RoomListingView);

  RoomListingView.$inject = ['$resource'];
  function RoomListingView($resource) {
      return $resource('/api/rooms/:id', {id: '@id'},
        {
          'get':    {method:'GET'},
          'query':  {method:'GET', isArray:true},
          'save':   {method: null},
          'remove': {method: null},
          'delete': {method: null}
        },
        {
          cache: false
        });
    }


}());


