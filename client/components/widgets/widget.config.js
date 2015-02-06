(function() {
  'use strict';

  var widgets = angular.module('app.widgets');

  widgets.config(uiGmapConfig);

  uiGmapConfig.$inject = ['uiGmapGoogleMapApiProvider'];

  function uiGmapConfig (uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyAm7woOFr0TOKG0U7jsBF5K3LSifdDjgfs',
      v: '3.17',
      libraries: 'places'
    });
  }

})();
