(function () {
  "use strict";

  angular.module('app.core')
    .factory('Property', function ($resource) {
      return $resource('/api/properties/:id', {id: '@id'});
    });


}());

