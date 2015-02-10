(function () {
  "use strict";

  angular
    .module('app.dashboard')
    .controller('AddNewPropertyCtrl',AddNewPropertyCtrl);

  AddNewPropertyCtrl.$inject = ['$scope','FileUploader', 'common', '$http'];

  function AddNewPropertyCtrl($scope, FileUploader, common, $http) {
    var vm = this;

    vm.uploader = new FileUploader();
    vm.uploader.url = '/api/images';
    vm.uploader.onSuccessItem = function (itm,res,status,header) {
      vm.me.userImage =res.saved;
    };


    vm.addNewProperty= function (input) {
      //common.Auth.createProperty({
      //  streetAddress: input.street,
      //  streetNumeric: input.number,
      //  city: input.city,
      //  state: input.country,
      //  zip: input.zip,
      //  createdAt: new Date()
      //}).then(function () {
      //  //do smthn
      //}).catch(function (err) {
      //  console.log('error while saving property', err);
      //});
      $http.post('/api/properties',{
        streetAddress: input.street,
        streetNumeric: input.number,
        city: input.city,
        state: input.country_short,
        zip: input.zip,
        createdAt: new Date()
      }).success(function (res) {

      }).error(function (err) {
        console.log('imas error', err);
      })
    }
  }

}());
