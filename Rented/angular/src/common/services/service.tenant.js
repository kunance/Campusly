angular.module('service.tenant', ['service.firebase'])
.factory('tenantService', ["$rootScope", "firebaseRef", "syncData",
function($rootScope, firebaseRef, syncData)
{
    return {
         watchlist: function (tenantId)
         {
             return syncData('watchlist/'+tenantId).$asArray();
         },
         fetchBids: function(tenantId,limit)
         {
             return syncData('bids/user/'+tenantId,limit).$asArray();
         }
    };
}]);
