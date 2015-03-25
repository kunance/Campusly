(function () {
  "use strict";

  angular
    .module('app.core')
    .factory('Lookings', Lookings);

  Lookings.$inject = ['$resource'];
  function Lookings($resource) {
      return $resource('/api/lookings/:id', {id: '@id'},
        {
          getEveryLooking: {
            method: 'GET',
            isArray:true
          },
          'query':  {method:'GET', isArray:true}
        }
      );
    }


}());
