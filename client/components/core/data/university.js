(function () {
  "use strict";

  angular.module('app.core')
    .factory('University', University);

  University.$inject = ['$resource'];
  function University($resource) {
      return $resource('/api/universities/:id', {id: '@id'},
        {
          getAllUniversities: {
            method: 'GET',
            isArray:true,
            params: {
              id:'all'
            }
          }
        }
      );
    }


}());
