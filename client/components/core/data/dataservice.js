(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['$http', '$location', 'Property', 'Vehicle', 'Pet', 'Address', 'Education'];

  function dataservice($http, $location, Property, Vehicle, Pet, Address, Education) {

    var safeCb = function(cb) {
        return (angular.isFunction(cb)) ? cb : angular.noop;
      };

    var service = {
     addProperty:addProperty,
     addVehicle:addVehicle,
     addPet: addPet,
     addAddress: addAddress,
     addEducation:addEducation,
     getAllEducations: getAllEducations,
     deleteEducation:deleteEducation,
     getEducation:getEducation,
     editEducation:editEducation
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

    function addEducation(userId, data) {
      return Education.save({userId: userId}, data,
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

    function getAllEducations(userId, data) {
      return Education.getAllEducations({userId: userId}, data,
        function (res) {
          return res;
      }, function (err) {
        //handle exception
      });
    }

    function deleteEducation(userId, educationId, data) {
      return Education.delete({userId: userId, id:educationId}, data,
        function (res) {
          return res;
        }, function (err) {
          //handle exception
        });
    }

    function getEducation(userId, educationId, data) {
      return Education.get({userId: userId, id:educationId}, data,
        function (res) {
          return res;
        }, function (err) {
          //handle exception
        });
    }

    function editEducation(userId, educationId, data, callback) {
      return Education.editEducation({userId: userId, id:educationId}, data,
        function (edu) {
          return safeCb(callback)(null, edu);
        }, function (err) {
          return safeCb(callback)(err);
        });
    }
  }
}());
