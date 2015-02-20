(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('addressAutocomplete', addressAutocomplete);

  addressAutocomplete.$inject = ['uiGmapGoogleMapApi'];

  function addressAutocomplete(uiGmapGoogleMapApi) {
    return {
      scope: {
        details: '=',
        addressAutocomplete: '=',
        options: '='
      },

      link: function(scope, element, attrs, model) {
        uiGmapGoogleMapApi.then(function(maps) {
          //options for autocomplete
          var opts;
          //convert options provided to opts
          var initOpts = function() {
            opts = {};
            if (scope.options) {
              if (scope.options.types) {
                opts.types = [];
                opts.types.push(scope.options.types)
              }
              if (scope.options.bounds) {
                opts.bounds = scope.options.bounds
              }
              if (scope.options.country) {
                opts.componentRestrictions = {
                  country: scope.options.country
                }
              }
            }
          };
          initOpts();

          //create new autocomplete
          //reinitializes on every change of the options provided
          var newAutocomplete = function() {
            scope.gPlace = new maps.places.Autocomplete(element[0], opts);
            maps.event.addListener(scope.gPlace, 'place_changed', function() {
              scope.$apply(function() {
                scope.addressAutocomplete = {};
                if (!scope.gPlace.getPlace() || !scope.gPlace.getPlace().geometry)
                  return false;
                fillAddressData(scope.gPlace.getPlace(), scope.addressAutocomplete);
              });
            })
          };
          newAutocomplete();

          //watch options provided to directive
          scope.watchOptions = function () {
            return scope.options
          };
          scope.$watch(scope.watchOptions, function () {
            initOpts();
            newAutocomplete();
            element[0].value = '';
            //scope.addressAutocomplete = element.val();
          }, true);
        });
      }
    };
  }

  var fillAddressData = function (place, address) {
    address.full = place.formatted_address;
    for (var i = 0; i < place.address_components.length; i++) {
      var addressType = place.address_components[i].types[0];
      switch(addressType) {
        case 'locality':
          address['city'] = place.address_components[i]['long_name'];
          break;
        case 'route':
          address['streetAddress'] = place.address_components[i]['long_name'];
          break;
        case 'street_number':
          address['streetNumeric'] = Number(place.address_components[i]['long_name']);
          break;
        case 'country':
          address['country'] = place.address_components[i]['long_name'];
          address['state'] = place.address_components[i]['short_name'];
          break;
        case 'postal_code':
          address['zip'] = Number(place.address_components[i]['short_name']);
          break;
        default:
          break;
      }
    }
    address.location = {latitude: place.geometry.location.lat(), longitude: place.geometry.location.lng()};
  }
}());
