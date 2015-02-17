(function () {

  'use strict';

  angular.module('app.core')
    .factory('Local', Local);

  Local.$inject = ['$resource'];

  function Local ($resource) {
    return $resource('/auth/local/:controller', {
        id: '@_id'
      },
      {
        verifyMail: {
          method: 'GET',
          params: {
            controller:'mailconfirmation'
          }
        },
        confirmMail: {
          method: 'POST',
          params: {
            controller:'mailconfirmation'
          }
        },
        resetPassword: {
          method: 'GET',
          params: {
            controller: 'passwordreset'
          }
        },
        confirmPassword: {
          method: 'POST',
          params: {
            controller:'passwordreset'
          }
        }
      });
  }
})();
