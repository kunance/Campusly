(function () {
  "use strict";

  angular.module('app.core')
    .factory('Status', Status);

  Status.$inject = ['$resource'];
  function Status($resource) {
    return $resource('/api/users/:userId/status/:id', {userId:'@userId', id: '@id'},
      {
        editStatus: {
          method: 'PUT'
        }
      }
    );
  }

}());
