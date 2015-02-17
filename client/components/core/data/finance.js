(function () {
  "use strict";

  angular.module('app.core')
    .factory('Finance', function ($resource) {
      return $resource('/api/users/:userId/finances/:id', {userId:'@userId', id: '@id'},
        {
          getAllFinances: {
            method: 'GET',
            isArray:true,
            params: {
              id:'all'
            }
          },
          editFinance: {
            method: 'PUT'
          }
        }
      );
    });


}());
