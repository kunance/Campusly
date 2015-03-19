(function () {
  "use strict";

  angular
    .module('app.core')
    .factory('Property', Property);

  Property.$inject = ['$resource'];
  function Property($resource) {
      return $resource('/api/properties/:id', {id: '@id'},
        {
          getAllProperties: {
            method: 'GET',
            isArray:true,
            params: {
              id:'all'
            }
          },
          editProperty: {
            method: 'PUT'
          }
        });
    }


}());

