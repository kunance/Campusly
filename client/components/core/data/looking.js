(function () {
  "use strict";

  angular
    .module('app.core')
    .factory('Looking', Looking);

  Looking.$inject = ['$resource'];
  function Looking($resource) {
      return $resource('/api/users/:userId/lookings/:id', {userId:'@userId', id: '@id'},
        {
          getAllLookings: {
            method: 'GET',
            isArray:true,
            params: {
              id:'all'
            }
          },
          editLooking: {
            method: 'PUT'
          }
        }
      );
    }


}());
