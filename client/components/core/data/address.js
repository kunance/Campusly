(function () {
  "use strict";

  angular
    .module('app.core')
    .factory('Address', Address);

  Address.$inject = ['$resource'];
    function Address($resource) {
      return $resource('/api/users/:userId/addresses/:id', {userId: '@userId', id: '@id'},
        {
          getAllAddresses: {
            method: 'GET',
            //isArray:true, //for MVP
            params: {
              id:'all'
            }
          },
          editAddress: {
            method: 'PUT'
          }
        }
      );
    }

}());
