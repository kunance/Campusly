(function () {
  "use strict";

  angular.module('app.core')
    .factory('Education', function ($resource) {
      return $resource('/api/users/:userId/educations/:id', {userId:'@userId', id: '@id'},
        {
          getAllEducations: {
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
