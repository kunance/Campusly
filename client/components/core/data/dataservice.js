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
       editEducation:editEducation,
       getAllPets: getAllPets,
       deletePet:deletePet,
       getSinglePet:getSinglePet,
       editPet:editPet,
       getAllAddresses: getAllAddresses,
       deleteAddress:deleteAddress,
       getAddress:getAddress,
       editAddress:editAddress
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

    function getAllPets(userId, data) {
      return Pet.getAllPets({userId: userId}, data,
        function (res) {
          return res;
        }, function (err) {
          //handle exception
        });
    }

    function deletePet(userId, educationId, data) {
      return Pet.delete({userId: userId, id:educationId}, data,
        function (res) {
          return res;
        }, function (err) {
          //handle exception
        });
    }

    function getSinglePet(userId, educationId, data) {
      return Pet.get({userId: userId, id:educationId}, data,
        function (res) {
          return res;
        }, function (err) {
          //handle exception
        });
    }

    function editPet(userId, educationId, data, callback) {
      return Pet.editPet({userId: userId, id:educationId}, data,
        function (edu) {
          return safeCb(callback)(null, edu);
        }, function (err) {
          return safeCb(callback)(err);
        });
    }

    function getAllAddresses(userId, data) {
      return Address.getAllAddresses({userId: userId}, data,
        function (res) {
          return res;
        }, function (err) {
          //handle exception
        });
    }

    function deleteAddress(userId, addressId, data) {
      return Address.delete({userId: userId, id:addressId}, data,
        function (res) {
          return res;
        }, function (err) {
          //handle exception
        });
    }

    function getAddress(userId, addressId, data) {
      return Address.get({userId: userId, id:addressId}, data,
        function (res) {
          return res;
        }, function (err) {
          //handle exception
        });
    }

    function editAddress(userId, addressId, data, callback) {
      return Address.editAddress({userId: userId, id:addressId}, data,
        function (adr) {
          return safeCb(callback)(null, adr);
        }, function (err) {
          return safeCb(callback)(err);
        });
    }


  }
}());
