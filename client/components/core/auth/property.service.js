(function () {
  "use strict";

  angular.module('app.core')
    .factory('PropertyResource', function ($resource) {
      return $resource('/api/properties/:propId/images/:imgId', {
          propId: '@propId',
          imgId:'@imgId'
        },
        {
          get: {
            method: 'GET',
            params: {
              id:'me'
            }
          },
          changeInfo: {
            method: 'PUT',
            params: {
              controller:'info'
            }
          }
        });
    });


}());

