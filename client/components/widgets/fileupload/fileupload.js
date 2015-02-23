(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('fileupload', fileupload);

  fileupload.$inject = ['FileUploader', '$cookieStore'];

  function fileupload (FileUploader, $cookieStore) {
    return {
      restrict: 'A',
      templateUrl:'components/widgets/fileupload/fileupload.html',
      scope: {data: '='},
      link: function (scope, element, attrs) {
       scope.uploader = new FileUploader({
          url: scope.data.url,
          headers: {Authorization: 'Bearer ' + $cookieStore.get('token')}
        });
        scope.uploader.filters.push({
          name: 'imageFilter',
          fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
          }
        });
        scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
          scope.data.successCallback (fileItem, response);
        };
        scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
          scope.data.errorCallback (response);
        };
      }
    };
  };




}());
