angular.module('service.mail', ['service.firebase'])
.factory('mailService', ["$rootScope", "firebaseRef", "syncData",'$http',
function($rootScope, firebaseRef, syncData,$http)
{
    var wakeUpDyno= _.debounce(function ()
        {
             $http.get('http://rentedco.herokuapp.com/')
                  .success(function () { console.log('dyno waked up'); })
                  .error(function (err) { console.log('cannot wake up the dyno', err); })
        },1000);

    
    return {
         send: function(userId,template,vars)
         {
             firebaseRef('sendQueue').push({ userId: userId, template: template, vars: vars });
             wakeUpDyno();
         }
    };
}]);
