(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['$http', '$location', 'Property', 'Vehicle', 'Pet', 'Address'];

  function dataservice($http, $location, Property, Vehicle, Pet, Address) {

    var service = {
     addProperty:addProperty,
     addVehicle:addVehicle,
     addPet: addPet,
      addAddress: addAddress
    };
    return service;

    function addProperty(data) {
      return Property.save(data,
        function(res) {
          return res;
        },
        function(err) {
         //handle this exception
        });
    }

    function addVehicle(userId, data) {
      return Vehicle.save({userId: userId}, data,
        function(res) {
          return res;
        },
        function(err) {
          //handle this exception
        });
    }

    function addPet(userId, data) {
      return Pet.save({userId: userId}, data,
        function(res) {
          return res;
        },
        function(err) {
          //handle this exception
        });
    }

    function addAddress(userId, data) {
      return Address.save({userId: userId}, data,
        function (res) {
          return res;
        },
        function (err) {
          //handle this exception
        });
    }

  }
}());
