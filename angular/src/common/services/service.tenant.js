angular.module('service.tenant', ['service.firebase'])
.factory('tenantService', ["$rootScope", "firebaseRef", "syncData",
function($rootScope, firebaseRef, syncData)
{
    return {
         watchlist: function wait(cb)
         {
             if ($rootScope.profile&&$rootScope.profile.$id)
               cb(syncData('watchlist/'+$rootScope.profile.$id).$asArray());
             else
               _.delay(wait,500,cb);
         }
    };
}]);
