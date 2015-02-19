(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('slider', slider);

  slider.$inject = ['$timeout'];

  function slider($timeout) {
    return {
      restrict: 'A',
      replace: true,
      scope: {
        images: '='
      },
      link: function(scope, elem, attrs) {
        scope.currentIndex = 0; // Initially the index is at the first image

        scope.next = function() {
          scope.currentIndex < scope.images.length - 1 ? scope.currentIndex++ : scope.currentIndex = 0;
        };

        scope.prev = function() {
          scope.currentIndex > 0 ? scope.currentIndex-- : scope.currentIndex = scope.images.length - 1;
        };
        scope.$watch('currentIndex', function() {
          scope.images.forEach(function(image) {
            image.visible = false; // make every image invisible
          });

          scope.images[scope.currentIndex].visible = true; // make the current image visible
        });
      },
      templateUrl: '../../../components/widgets/slider/template.html'
    };
  }

}());
