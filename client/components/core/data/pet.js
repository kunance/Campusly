(function () {
  "use strict";

  angular.module('app.core')
    .factory('Pet', function ($resource) {
      return $resource('/api/users/:userId/pets/:id', {userId:'@userId', id: '@id'});
    });


}());
