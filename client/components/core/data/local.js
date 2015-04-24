(function () {

  'use strict';

  angular
    .module('app.core')
    .factory('Local', Local);

  Local.$inject = ['$resource'];

  function Local ($resource) {
    return $resource('/auth/local/:controller/:userId', {
        userId: '@userId'
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
          method: 'POST',
          params: {
            controller: 'sendingPWDresetMail'
          }
        },
        unsubscribeUser:{
          method: 'POST',
          params: {
            controller:'unsubscribeUser'
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
