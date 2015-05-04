(function() {

  'use strict';

  angular
    .module('app.widgets')
    .service('distanceCalculator', distanceCalculator);

  distanceCalculator.$inject = ['uiGmapGoogleMapApi', '$q', '$timeout', '$interval'];

  function distanceCalculator (uiGmapGoogleMapApi, $q, $timeout, $interval) {
    var maps = initializeMaps();

    var service = {
      calculateDistance: calculateDistance,
      calculateDistanceForEveryTransport: calculateDistanceForEveryTransport
    };

    return service;
    function calculateDistance(srcLatLong, destLatLong, mode, Unit, DurDis) {
      var deferred = $q.defer();
      maps
        .then(function(m) {
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
              deferred.resolve(response.routes[0].legs[0][DurDis]);
            } else {
              var repeat = $interval(function () {
                directionsService.route(request, function (response, status) {
                  if (status == google.maps.DirectionsStatus.OK) {
                    deferred.resolve(response.routes[0].legs[0][DurDis]);
                    $interval.cancel(repeat);
                  }
                })
              },1000);
              }
          });
      })
        .catch(function (err) {
          console.log('error: ', err);
        });
      return deferred.promise;
  }

   function calculateDistanceForEveryTransport(src,dest,DurDis) {
      var deferred = $q.defer();
      var modes = ['DRIVING', 'WALKING', 'BICYCLING'];
      var unitSystem = 'IMPERIAL';

     var driving = calculate(src, dest, 'DRIVING', unitSystem, DurDis);
     var walking = calculate(src, dest, 'WALKING', unitSystem, DurDis);
     var bicycling = calculate(src, dest, 'BICYCLING', unitSystem, DurDis);

     var promises = [driving, walking, bicycling];

      $q.all(promises).then(function (results) {
        var response = {};
        _(results).forEach(function (result) {
          _.merge(response, result);
        });
        deferred.resolve(response);
      }).catch(function (error) {
        console.log('error in calculation', error);
      });
      return deferred.promise;
   }

   function calculate(source, destination, property, unitSystem, DurDis) {
      var deferred = $q.defer();
        calculateDistance(source, destination, property, unitSystem, DurDis)
          .then(function (distance) {
          var string = distance.text;
          var minutesTrimmed = string.replace("mins","m");
          var minuteTrimmed = minutesTrimmed.replace("min","m");
          var hoursTrimmed = minuteTrimmed.replace("hours","h");
          var hourTrimmed = hoursTrimmed.replace("hour","h");
          var DayTrimmed = hourTrimmed.replace("days","d");
          var finalString = DayTrimmed.replace("day","d");
          var obj = {};
          obj[property] = (finalString);
          deferred.resolve(obj);
        })
          .catch(function (err) {
            console.log(err);
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
