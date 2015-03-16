(function() {

  'use strict';

  angular
    .module('app.widgets')
    .service('distanceCalculator', distanceCalculator);

  distanceCalculator.$inject = ['uiGmapGoogleMapApi', '$q'];

  function distanceCalculator (uiGmapGoogleMapApi, $q) {
    var maps = initializeMaps();

    var service = {
      calculateDistance: calculateDistance,
      calculateDistanceForEveryTransport: calculateDistanceForEveryTransport
    };

    return service;
    function calculateDistance(srcLatLong, destLatLong, mode, Unit, transit) {
      var deferred = $q.defer();
      maps.then(function(m) {
          var directionsService = new m.DirectionsService();
          var a = new m.LatLng(srcLatLong.latitude, srcLatLong.longitude);
          var b = new m.LatLng(destLatLong.latitude, destLatLong.longitude);
          var request = {
            origin: a,
            destination: b,
            optimizeWaypoints: true,
            travelMode: google.maps.TravelMode[mode],
            unitSystem: google.maps.UnitSystem[Unit]
          };

          directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
              //deferred.resolve(response.routes[0].legs[0].distance);
              deferred.resolve(response.routes[0].legs[0].duration);
            } else {
              deferred.reject('Error occurred while trying to calculate distance');
            }
          });
        //}
      });
      return deferred.promise;
  }

   function calculateDistanceForEveryTransport(src,dest) {
      var deferred = $q.defer();
      var modes = ['DRIVING', 'WALKING', 'BICYCLING'];
      var unitSystem = 'IMPERIAL';
      var promises = [];
      for (var i = 0; i < modes.length; i += 1) {
        promises.push(calculate(src, dest, modes[i], unitSystem));
      }
      $q.all(promises).then(function (results) {
        var response = {};
        _(results).forEach(function (result) {
          _.merge(response, result);
        });
        deferred.resolve(response);
      }, function (error) {
        logger.error('error while calculating distance');
      });
      return deferred.promise;
   }

   function calculate(source, destination, property, unitSystem) {
      var deferred = $q.defer();
        calculateDistance(source, destination, property, unitSystem).then(function (distance) {
          var obj = {};
          obj[property] = (distance.text);
          deferred.resolve(obj);
        });
      return deferred.promise;
   }

    function initializeMaps() {
      var deferred = $q.defer();
      uiGmapGoogleMapApi.then(function(maps) {
        deferred.resolve(maps);
      });
      return deferred.promise;
    }
  }
})();
