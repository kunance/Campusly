(function () {
  "use strict";

  angular.module('app.core')
    .factory('Vehicle', Vehicle);

  Vehicle.$inject = ['$resource'];
  function Vehicle($resource) {
      return $resource('/api/users/:userId/vehicles/:id', {userId:'@userId', id: '@id'},
        {
          getAllVehicles: {
            method: 'GET',
            isArray:true,
            params: {
              id:'all'
            }
          },
          editVehicle: {
            method: 'PUT'
          }
        }
      );
    }

}());
