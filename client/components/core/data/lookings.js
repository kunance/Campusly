(function () {
  "use strict";

  angular.module('app.core')
    .factory('Lookings', function ($resource) {
      return $resource('/api/lookings/:id', {id: '@id'},
        {
          getEveryLooking: {
            method: 'GET',
            isArray:true,
            params: {
              id:'all'
            }
          }
        }
      );
    });


}());
