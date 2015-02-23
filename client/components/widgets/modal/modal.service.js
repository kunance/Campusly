(function() {

  'use strict';

  angular
    .module('app.widgets')
    .factory('ModalService', ModalService);

  ModalService.$inject = ['$rootScope', '$modal'];

  function ModalService($rootScope, $modal) {

    function openModal(scope) {
      scope.datePickers = {
        startDate: false,
        endDate:false,
        graduationDate:false
      };

      scope.format = 'dd.MM.yyyy';
      scope.clear = function () {
        scope.dt = null;
      };
      scope.open = function($event, number) {
        $event.preventDefault();
        $event.stopPropagation();
        scope.datePickers[number]= true;
      };
      var modalScope = $rootScope.$new();
      scope = scope || {};
      angular.extend(modalScope, scope);
      return $modal({scope: modalScope, template: 'components/widgets/modal/modal.html', show: true});
    }



    // Public API here
    return {

      /* Confirmation modals IMPORTANT: will not work, made for ui bootstrap, not angular strap*/
      confirm: {

        /**
         * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
         * @param  {Function} del - callback, ran when delete is confirmed
         * @return {Function}     - the function to open the modal (ex. myModalFn)
         */
        delete: function (del) {
          del = del || angular.noop;

          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed staight to del callback
           */
          return function () {
            var args = Array.prototype.slice.call(arguments),
              name = args.shift(),
              deleteModal;

            deleteModal = openModal({
              modal: {
                dismissable: true,
                title: 'Confirm Delete',
                html: '<p>Are you sure you want to delete <strong>' + name + '</strong> ?</p>',
                buttons: [{
                  classes: 'btn-danger',
                  text: 'Delete',
                  click: function (e) {
                    deleteModal.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function (e) {
                    deleteModal.dismiss(e);
                  }
                }]
              }
            }, 'modal-danger');

            deleteModal.result.then(function (event) {
              del.apply(event, args);
            });
          };
        }
      },
      sendEmail: function (send) {
        send = send || angular.noop;
        /**
         * Open a delete confirmation modal
         * @param  {String} name   - name or info to show on modal
         * @param  {All}           - any additional args are passed staight to del callback
         */
        return function () {
          var args = Array.prototype.slice.call(arguments),
            name = args.shift(),
            emailSendModal;

          emailSendModal = openModal({
            modal: {
              title: 'Send email',
              contentHtml: 'components/widgets/modal/email.html',
              class : 'modal-info',
              buttons: [{
                classes: 'btn-confirm',
                text: 'Send',
                click: function (data) {
                  send.call(undefined,data.mail);
                  emailSendModal.hide();
                }
              }, {
                classes: 'btn-default',
                text: 'Cancel',
                click: function () {
                  emailSendModal.hide();
                }
              }]
            }
          });
          emailSendModal.$promise.then(emailSendModal.show);
        };
      },
      uploadDocument: function (uploadData, uploadCb) {
        uploadCb = uploadCb || angular.noop;
        /**
         * Open a delete confirmation modal
         * @param  {String} name   - name or info to show on modal
         * @param  {All}           - any additional args are passed staight to del callback
         */
        return function () {
          var args = Array.prototype.slice.call(arguments),
            name = args.shift(),
            documentUploadModal;

          documentUploadModal = openModal({
            modal: {
              title: 'Upload Document',
              contentHtml: 'components/widgets/modal/document-upload.html',
              class : 'modal-info',
              icon: 'icon-vehicle-info',
              uploadData: uploadData,
              buttons: [/*{
               classes: 'btn-confirm',
               text: 'Send',
               click: function (data) {
               uploadCb.call();
               documentUploadModal.hide();
               }
               },*/ {
                classes: 'btn-default',
                text: 'Cancel',
                click: function () {
                  documentUploadModal.hide();
                }
              }]
            }
          });
          documentUploadModal.$promise.then(documentUploadModal.show);
        };
      },
      addAddress: function (data, cb) {
        cb = cb || angular.noop;
        /**
         * Open a delete confirmation modal
         * @param  {String} name   - name or info to show on modal
         * @param  {All}           - any additional args are passed staight to del callback
         */
        return function () {
          var args = Array.prototype.slice.call(arguments),
            name = args.shift(),
            addressModal;

          addressModal = openModal({
            modal: {
              title: 'Add new address',
              contentHtml: 'components/widgets/modal/address.html',
              class : 'modal-info',
              icon: 'icon-details',
              forms: {},
              data: data,
              buttons: [{
                classes: 'btn-confirm',
                text: 'Add',
                click: function (modal) {
                  if (angular.isUndefined(modal.forms.addressForm))
                    return false;
                  if (modal.forms.addressForm.$invalid) {
                    modal.submitted = true;
                  } else {
                    cb.call(undefined, modal.data);
                    addressModal.hide();
                  }
                }
              }, {
                classes: 'btn-default',
                text: 'Cancel',
                click: function () {
                  addressModal.hide();
                }
              }, {
                classes: 'btn-danger',
                text: 'Delete',
                hidden: data.mode==='add',
                icon: 'icon-close',
                click: function (modal) {
                  modal.data.mode = 'delete';
                  cb.call(undefined, modal.data);
                  addressModal.hide();
                }
              }]
            }
          });
          addressModal.$promise.then(addressModal.show);
        };
      },
      collectUserData: function (data, cb) {
        cb = cb || angular.noop;
        /**
         * Open a delete confirmation modal
         * @param  {String} name   - name or info to show on modal
         * @param  {All}           - any additional args are passed staight to del callback
         */
        return function () {
          var args = Array.prototype.slice.call(arguments),
            name = args.shift(),
            userDataModal;

          userDataModal = openModal({
            modal: {
              title: 'Additional user data',
              forms: {},
              data: data,
              states: [{value:'AC', text: 'Acre'}, {value:'AL', text: 'Alagoas'}, {value:'AP', text: 'Amapá'}, {value:'AM', text: 'Amazonas'}, {value:'BA', text: 'Bahia'}, {value:'CE', text: 'Ceará'}, {value:'DF', text: 'Distrito Federal'}, {value:'ES', text: 'Espírito Santo'}, {value:'GO', text: 'Goias'}, {value:'MA', text: 'Maranhão'}, {value:'MT', text: 'Mato Grosso'}, {value:'MS', text: 'Mato Grosso do Sul'}, {value:'MG', text: 'Minas Gerais'}, {value:'PA', text: 'Pará'}, {value:'PB', text: 'Paraíba'}, {value:'PR', text: 'Paraná'}, {value:'PE', text: 'Pernambuco'}, {value:'PI', text: 'Piauí'}, {value:'RJ', text: 'Rio de Janeiro'}, {value:'RN', text: 'Rio Grande do Norte'}, {value:'RS', text: 'Rio Grande do Sul'}, {value:'RO', text: 'Rondônia'}, {value:'RR', text: 'Roraima'}, {value:'SC', text: 'Santa Catarina'}, {value:'SP', text: 'São Paulo'}, {value:'SE', text: 'Sergipe'}, {value:'TO', text: 'Tocantins'}],              contentHtml: 'components/widgets/modal/user-data.html',
              class : 'modal-info',
              icon: 'icon-details',
              buttons: [{
                classes: 'btn-confirm',
                text: 'Continue',
                /*disabled: function(modal) {
                 if (angular.isUndefined(modal.forms.userDataForm))
                 return false;
                 return modal.forms.userDataForm.$invalid;
                 },*/
                click: function (modal) {
                  if (angular.isUndefined(modal.forms.userDataForm))
                    return false;
                  if (modal.forms.userDataForm.$invalid) {
                    modal.submitted = true;
                  } else {
                    cb(modal.data);
                    userDataModal.hide();
                  }
                }
              }, {
                classes: 'btn-default',
                text: 'Close',
                // disabled: function() {return false;},
                click: function () {
                  userDataModal.hide();
                }
              }]
            }
          });
          ;
          userDataModal.$promise.then(userDataModal.show);
        };
      }
    };
  };

})();
