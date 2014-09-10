'use strict';


/* Controllers */
angular.module('myApp.admin', ['ngRoute'])

// configure views; the authRequired parameter is used for specifying pages
// which should only be available while logged in
.config(['$routeProvider',
    function($routeProvider) {

        var ADMIN_ONLY= function (profile)
            {
                 console.log('admin only', profile);

                 if (profile.type!='admin')
                   return '/'; 
            };

        $routeProvider.when('/admin/credit-check/:id?', {
            authRequired: true,
            templateUrl: 'admin/credit-check.tpl.html',
            controller: 'CreditCheckCtrl',
            profileRequired: ADMIN_ONLY
        });

}])

.controller('CreditCheckCtrl', ['$scope','$rootScope','$location','$routeParams','firebaseRef','TopBannerChannel',
    function($scope,$rootScope,$location,$routeParams,firebaseRef,TopBannerChannel) 
    {
        firebaseRef('users').on('value',function (data)
        {
           $scope.tenants= [];

           console.log('fetched');

           data.forEach(function (tenantData)
           {
                var data= tenantData.val();

                if (data.type=='tenant')
                  $scope.tenants.push(_.extend({ $id: tenantData.name() },data));
           });

           $scope.tenants.reverse();

           _.defer(function () { $scope.$apply(); });
        });

        $scope.select= function (user)
        {
            $scope.tenant= user;

            $scope.creditCheck= null;

            firebaseRef('credit',user.$id).once('value',function (data)
            {
                $scope.creditCheck= data.val();
                $scope.$apply();
            },console.log);
        };

        $scope.pdfSelected= function ($files,tenant)
        {
            TopBannerChannel.setBanner({
                content: 'Uploading credit check...',
                contentClass: 'info'
            });

            _.each($files,function (file)
            {
                var fileReader= new FileReader();
                
                fileReader.onload= function (e)
                {
                    firebaseRef('credit',tenant.$id).set(e.target.result,function (err)
                    {
                          $('#fileupload').val('');

                          if (err)
                          {
                                console.log(err);

                                TopBannerChannel.setBanner({
                                    content: err,
                                    contentClass: 'danger'
                                });
                          }
                          else
                          {
                            TopBannerChannel.setBanner({
                                content: 'Credit check uploaded!',
                                contentClass: 'success'
                            });
                            $scope.creditCheck= e.target.result;
                            $scope.$apply();
                          }
                    });

                    $scope.$apply();
                };
                
                fileReader.readAsDataURL(file);
            });
        };

        $scope.rmPdf= function (tenant)
        {
           if (tenant.$id)
                firebaseRef('credit',tenant.$id).remove(function (err)
                {
                      if (err)
                      {
                            console.log(err);

                            TopBannerChannel.setBanner({
                                content: err,
                                contentClass: 'danger'
                            });
                      }
                      else
                      {
                        TopBannerChannel.setBanner({
                            content: 'Credit check removed!',
                            contentClass: 'success'
                        });
                        $scope.creditCheck= null;
                        $scope.$apply();
                      }
                });

        };
    }
]);

