(function () {
  "use strict";

  angular
    .module('app.core')
    .factory('Occupation', Occupation);

  Occupation.$inject = ['$resource'];
  function Occupation($resource) {
      return $resource('/api/users/:userId/occupations/:id', {userId:'@userId', id: '@id'},
        {
          getAllOccupations: {
            method: 'GET',
            isArray:true,
            params: {
              id:'all'
            }
          },
          editOccupation: {
            method: 'PUT'
          }
        }
      );
    }


}());
