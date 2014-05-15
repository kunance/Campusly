angular.module('service.banner', [])

    .service('TopBannerChannel', ['$rootScope', function ($rootScope) {

        var SET_TOP_BANNER = "SetTopBanner";

        // publish elevatedCoreTemperature
        // note that the parameters are particular to the problem domain
        var setBanner = function (data) {
            $rootScope.$broadcast(SET_TOP_BANNER, data);
        };

        // subscribe to elevatedCoreTemperature event.
        // note that you should require $scope first
        // so that when the subscriber is destroyed you
        // don't create a closure over it, and te scope can clean up.
        var onSetBanner = function ($scope, handler) {
            $scope.$on(SET_TOP_BANNER, function (event, data) {
                // note that the handler is passed the problem domain parameters
                handler(data);
            });
        };

        // other CoreReactorChannel events would go here.

        return {
            setBanner: setBanner,
            onSetBanner: onSetBanner
        };
    }]);