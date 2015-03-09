(function() {

  'use strict';

  angular
    .module('app.widgets')
    .service('distanceCalculator', distanceCalculator);

  distanceCalculator.$inject = ['common', 'uiGmapGoogleMapApi'];

  function distanceCalculator (common, uiGmapGoogleMapApi) {
    var maps;
    initializeMaps().then(function(m) {
      maps = m;
    });
    var service = {
      calculateDistance: calculateDistance
    };

    return service;

    function calculateDistance(srcLatLong, destLatLong, mode, Unit, transit) {
      var deferred = common.$q.defer();
      var directionsService = new maps.DirectionsService();
      var a = new maps.LatLng(srcLatLong.latitude, srcLatLong.longitude);
      var b = new maps.LatLng(destLatLong.latitude, destLatLong.longitude);
      var request = {
        origin: a,
        destination: b,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode[mode],
        unitSystem: google.maps.UnitSystem[Unit]
      };

      directionsService.route(request, function(response, status) {
//        common.logger.info('distance calculator STATUS- '+status);
        if (status == google.maps.DirectionsStatus.OK) {
          deferred.resolve(response.routes[0].legs[0].distance);
        } else {
          deferred.reject('Error occurred while trying to calculate distance');
        }
      });
      return deferred.promise;
    }

    function initializeMaps() {
      var deferred = common.$q.defer();
      uiGmapGoogleMapApi.then(function(maps) {
        deferred.resolve(maps);
      });
      return deferred.promise;
    }
  }

})();
