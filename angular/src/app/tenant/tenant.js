'use strict';


     var unwatch= function (property,watchlist,TopBannerChannel,mailService,$rootScope,propertyService)
     {
           var record= _.findWhere(watchlist,{ $value: property.$id });

           watchlist.$remove(record)
           .then(function ()
           {
                propertyService.removeWatcher(property.$id,$rootScope.profile.$id,
                function (err)
                {
                    if (err)
                    {
                        conole.log(err);

                        TopBannerChannel.setBanner
                        ({
                            content: 'There was an error removing the property from your watchlist',
                            type: 'danger'
                        });
                    }
                    else
                    {
                        TopBannerChannel.setBanner
                        ({
                            content: 'Property removed from your watchlist!',
                            type: 'success'
                        });

                        mailService.send($rootScope.profile.$id,
                                         'tenant-property-unwatch',
                                         { propertyname: property.address.street, 
                                           propertyid: property.$id });
                    }
                });

           },
           function (err)
           {
                conole.log(err);

                TopBannerChannel.setBanner
                ({
                    content: 'There was an error removing the property from your watchlist',
                    type: 'danger'
                });
           });
     };


/* Controllers */
angular.module('myApp.tenant', ['ngRoute'])

// configure views; the authRequired parameter is used for specifying pages
// which should only be available while logged in
.config(['$routeProvider',
    function($routeProvider) {

        $routeProvider.when('/tenants', {
            templateUrl: 'tenant/tenants.tpl.html',
            profileRequired: function (profile)
            {
                 if (profile&&profile.type=='tenant')
                 {
                 //    if (profile.completedOnBoarding)
                       return '/tenants/dashboard';
                  //   else
                  //     return '/tenants/myprofile';
                 }
            }
        });

        var TENANTS_ONLY= function (profile)
            {
                 console.log('tenants only', profile);

                 if (profile.type!='tenant')
                   return '/tenants'; 
            };

        $routeProvider.when('/tenants/myprofile/:step?', {
            authRequired: true,
            templateUrl: 'tenant/myprofile.tpl.html',
            controller: 'OnBoardingCtrl',
            profileRequired: TENANTS_ONLY
        });

        $routeProvider.when('/tenants/dashboard', {
            authRequired: true,
            templateUrl: 'tenant/dashboard.tpl.html',
            controller: 'TenantDashboardCtrl',
            profileRequired: TENANTS_ONLY
        });

        $routeProvider.when('/tenants/properties', {
            authRequired: true,
            templateUrl: 'tenant/properties.tpl.html',
            controller: 'TenantPropertiesCtrl',
            profileRequired: TENANTS_ONLY
        });
        
        $routeProvider.when('/tenants/invite-owner', {
            authRequired: true,
            templateUrl: 'tenant/invite-owner.tpl.html',
            controller: 'OnBoardingCtrl',
            profileRequired: TENANTS_ONLY
        });
        
        $routeProvider.when('/tenants/doc-center', {
            authRequired: true,
            templateUrl: 'tenant/doc-center.tpl.html',
            controller: 'OnBoardingCtrl',
            profileRequired: TENANTS_ONLY
        });
        
        $routeProvider.when('/tenants/verify', {
            authRequired: true,
            templateUrl: 'tenant/verify.tpl.html',
            controller: 'verifyTenantCtrl',
            profileRequired: TENANTS_ONLY
        });

        /* Hiding profile edit field
        $routeProvider.when('/tenants/profile', {
            authRequired: true,
            templateUrl: 'tenant/profile.tpl.html',
            controller: 'TenantProfileCtrl',
            profileRequired: TENANTS_ONLY
        });
        */
    }
])

.controller('OnBoardingCtrl', ['$scope','$rootScope','$location','$routeParams','mailService','shout', 'syncData','rentedProfile',
    function($scope,$rootScope,$location,$routeParams,mailService,shout,syncData,rentedProfile) {

       var steps= ['tenant/partials/profile.tpl.html',
                   'tenant/partials/credit-check.tpl.html',
                   'tenant/partials/ready-to-apply.tpl.html'];

       $scope.step= steps[+$routeParams.step-1 || 0];
       $scope.onBoarding= true;
       $scope.shout= {};

       // the rentedProfile function waits for the user profile to be loaded and then calls the callback
       rentedProfile(function (profile) // needed to be sure that the profile is loaded on refresh
       {
        
           syncData('credit/'+profile.$id).$asObject()  // or you will get an error because profile is still null
           .$inst().$ref().on('value',function (data)
           {
               $scope.profile.creditReport= data.val();
           });

       });

       $scope.invite= function (address)
       {
            mailService.send(_.map(address.split(','),
                                   function (a) { return a.trim(); }),
                             'owner-invited',
                             { inviter: $rootScope.profile.firstName+' '+$rootScope.profile.lastName },true);

            shout($scope)({ content: 'Invite sent!', type: 'success' });
       };
    }
])

.controller('verifyTenantCtrl', ['$scope',
    function($scope) {

        $scope.creditProfile = {"Header": {"ReportDate": "06/19/2014", "ReportTime": "05:53:01 PM CT"},
                "ConsumerIdentity": [{"Name": {"Type": {"desc": null, "code": null}, "Surname": "WHALEN", "First": "ANABEL", "Middle": null}}, {"Name": {"Type": {"desc": "AKA", "code": "A"}, "Surname": "ZAJAC", "First": "ANABIL", "Middle": null}}, {"Name": {"Type": {"desc": "AKA", "code": "A"}, "Surname": "ZAJOE", "First": "ANNABELLE", "Middle": null}}, {"Name": {"Type": {"desc": "AKA", "code": "A"}, "Surname": "ZAJAC", "First": "SAENZ", "Middle": null}}, {"Name": {"Type": {"desc": "AKA", "code": "A"}, "Surname": "ZAJAC", "First": "ANGELICA", "Middle": null}}],
                "AddressInformation": [{"FirstReportedDate": "12/27/2004", "LastUpdatedDate": "01/02/2014", "Origination": {"desc": "Update", "code": "2"}, "TimesReported": "0", "LastReportingSubcode": "3143770", "DwellingType": {"desc": "Single-family dwelling", "code": "S"}, "HomeOwnership": {"desc": "Single-family dwelling", "code": null}, "StreetPrefix": null, "StreetName": "1461 LAKE CHRISTOPHER DR", "StreetSuffix": null, "City": "VIRGINIA BEACH", "State": "VA", "Zip": "23464", "CensusGeoCode": null, "CountyCode": null}, {"FirstReportedDate": "07/20/2012", "LastUpdatedDate": "07/22/2013", "Origination": {"desc": "Update", "code": "1"}, "TimesReported": "0", "LastReportingSubcode": null, "DwellingType": {"desc": "Single-family dwelling", "code": "S"}, "HomeOwnership": {"desc": "Single-family dwelling", "code": null}, "StreetPrefix": null, "StreetName": "8352 STREAMWOOD DR", "StreetSuffix": null, "City": "BALTIMORE", "State": "MD", "Zip": "21208", "CensusGeoCode": null, "CountyCode": null}, {"FirstReportedDate": "08/19/2011", "LastUpdatedDate": "01/04/2012", "Origination": {"desc": "Update", "code": "1"}, "TimesReported": "0", "LastReportingSubcode": null, "DwellingType": {"desc": "Post Office Box", "code": "P"}, "HomeOwnership": {"desc": "Post Office Box", "code": null}, "StreetPrefix": null, "StreetName": "PO BOX 5141", "StreetSuffix": null, "City": "WILLIAMSBURG", "State": "VA", "Zip": "23188", "CensusGeoCode": null, "CountyCode": null}],
                "EmploymentInformation": [{"Name": "SAINT BARNABAS HOSPITAL", "Zip": null, "LastUpdatedDate": null, "FirstReportedDate": "01/2014", "Origination": {"desc": "Inquiry", "code": "2"}, "AddressFirstLine": null, "AddressSecondLine": null, "AddressExtraLine": null}, {"Name": "SHORELINE BEH HLTH", "Zip": null, "LastUpdatedDate": null, "FirstReportedDate": "12/2007", "Origination": {"desc": "Inquiry", "code": "2"}, "AddressFirstLine": null, "AddressSecondLine": null, "AddressExtraLine": null}],
                "PublicRecord": [{"Status": {"desc": "Bankruptcy chapter 7-discharged", "code": "15"}, "StatusDate": "09/12/2013", "FilingDate": "06/01/2013", "Evaluation": {"desc": "Negative", "code": "N"}, "Amount": "$0", "ConsumerComment": null, "Court": {"desc": "US BKPT CT MO KANSAS C", "code": "2008441"}, "ReferenceNumber": "0520194DRD", "PlaintiffName": null, "DisputeFlag": null, "ECOA": {"desc": "Individual", "code": "1"}, "Bankruptcy": {"Type": {"desc": null, "code": null}, "AssetAmount": "$0", "LiabilitiesAmount": "$0", "RepaymentPercent": null, "AdjustmentPercent": null}, "BookPageSequence": null}, {"Status": {"desc": "Bankruptcy chapter 7-discharged", "code": "15"}, "StatusDate": "06/12/2013", "FilingDate": "03/01/2013", "Evaluation": {"desc": "Negative", "code": "N"}, "Amount": "$0", "ConsumerComment": null, "Court": {"desc": "US BKPT CT MO KANSAS C", "code": "2008441"}, "ReferenceNumber": "0520194DRD", "PlaintiffName": null, "DisputeFlag": null, "ECOA": {"desc": "Individual", "code": "1"}, "Bankruptcy": {"Type": {"desc": null, "code": null}, "AssetAmount": "$0", "LiabilitiesAmount": "$0", "RepaymentPercent": null, "AdjustmentPercent": null}, "BookPageSequence": null}],
                "Inquiry": [{"Date": "04/05/2014", "Amount": "UNK", "Type": {"desc": "Unknown - Credit Extension, Review, Or Collection", "code": "31"}, "Terms": {"desc": null, "code": "N/A"}, "Subcode": "3135860", "KOB": {"desc": "All Banks -- Non-Specific", "code": "BB"}, "SubscriberDisplayName": "WEBBANK/DFS"}, {"Date": "02/28/2014", "Amount": "UNK", "Type": {"desc": "Unknown - Credit Extension, Review, Or Collection", "code": "31"}, "Terms": {"desc": null, "code": "N/A"}, "Subcode": "1232310", "KOB": {"desc": "Medical Group", "code": "MG"}, "SubscriberDisplayName": "MEDICAL PAYMENT DATA"}, {"Date": "01/05/2014", "Amount": "UNK", "Type": {"desc": "Unknown - Credit Extension, Review, Or Collection", "code": "31"}, "Terms": {"desc": null, "code": "N/A"}, "Subcode": "3135860", "KOB": {"desc": "All Banks -- Non-Specific", "code": "BB"}, "SubscriberDisplayName": "WEBBANK/DFS"}, {"Date": "10/15/2013", "Amount": "UNK", "Type": {"desc": "Unknown - Credit Extension, Review, Or Collection", "code": "31"}, "Terms": {"desc": null, "code": "N/A"}, "Subcode": "1639930", "KOB": {"desc": "Sales Financing Company", "code": "FF"}, "SubscriberDisplayName": "SYNCB/OLDNAVY"}, {"Date": "08/12/2013", "Amount": "UNK", "Type": {"desc": "Unknown - Credit Extension, Review, Or Collection", "code": "31"}, "Terms": {"desc": null, "code": "N/A"}, "Subcode": "1354830", "KOB": {"desc": "Complete Department Stores", "code": "DC"}, "SubscriberDisplayName": "SYNCB/JC PENNEY"}, {"Date": "08/03/2013", "Amount": "UNK", "Type": {"desc": "Unknown - Credit Extension, Review, Or Collection", "code": "31"}, "Terms": {"desc": null, "code": "N/A"}, "Subcode": "1220580", "KOB": {"desc": "Bank Credit Cards", "code": "BC"}, "SubscriberDisplayName": "CAP ONE"}, {"Date": "07/15/2013", "Amount": "UNK", "Type": {"desc": "Unknown - Credit Extension, Review, Or Collection", "code": "31"}, "Terms": {"desc": null, "code": "N/A"}, "Subcode": "1639930", "KOB": {"desc": "Sales Financing Company", "code": "FF"}, "SubscriberDisplayName": "SYNCB/OLDNAVY"}, {"Date": "05/14/2013", "Amount": "UNK", "Type": {"desc": "Unknown - Credit Extension, Review, Or Collection", "code": "31"}, "Terms": {"desc": null, "code": "N/A"}, "Subcode": "1639980", "KOB": {"desc": "Sales Financing Company", "code": "FF"}, "SubscriberDisplayName": "SYNCB/AMERICAN EAGLE"}, {"Date": "05/12/2013", "Amount": "UNK", "Type": {"desc": "Unknown - Credit Extension, Review, Or Collection", "code": "31"}, "Terms": {"desc": null, "code": "N/A"}, "Subcode": "1354830", "KOB": {"desc": "Complete Department Stores", "code": "DC"}, "SubscriberDisplayName": "SYNCB/JC PENNEY"}, {"Date": "05/03/2013", "Amount": "UNK", "Type": {"desc": "Unknown - Credit Extension, Review, Or Collection", "code": "31"}, "Terms": {"desc": null, "code": "N/A"}, "Subcode": "1220580", "KOB": {"desc": "Bank Credit Cards", "code": "BC"}, "SubscriberDisplayName": "CAP ONE"}, {"Date": "02/14/2013", "Amount": "UNK", "Type": {"desc": "Unknown - Credit Extension, Review, Or Collection", "code": "31"}, "Terms": {"desc": null, "code": "N/A"}, "Subcode": "1639980", "KOB": {"desc": "Sales Financing Company", "code": "FF"}, "SubscriberDisplayName": "SYNCB/AMERICAN EAGLE"}, {"Date": "11/11/2012", "Amount": "UNK", "Type": {"desc": "Collection Department/Agency/Attorney", "code": "48"}, "Terms": {"desc": null, "code": "N/A"}, "Subcode": "1984208", "KOB": {"desc": "Other Collection Agencies", "code": "YC"}, "SubscriberDisplayName": "NORTHLAND GROUP, INC"}, {"Date": "08/11/2012", "Amount": "UNK", "Type": {"desc": "Collection Department/Agency/Attorney", "code": "48"}, "Terms": {"desc": null, "code": "N/A"}, "Subcode": "1984208", "KOB": {"desc": "Other Collection Agencies", "code": "YC"}, "SubscriberDisplayName": "NORTHLAND GROUP, INC"}, {"Date": "06/10/2012", "Amount": "UNK", "Type": {"desc": "Unknown - Credit Extension, Review, Or Collection", "code": "31"}, "Terms": {"desc": null, "code": "N/A"}, "Subcode": "2342926", "KOB": {"desc": "Specialty Clothing Store", "code": "CS"}, "SubscriberDisplayName": "COMENITY BANK/LNBRYANT"}, {"Date": "05/06/2012", "Amount": "UNK", "Type": {"desc": "Unknown - Credit Extension, Review, Or Collection", "code": "31"}, "Terms": {"desc": null, "code": "N/A"}, "Subcode": "2685010", "KOB": {"desc": "Sales Financing Company", "code": "FF"}, "SubscriberDisplayName": "CREDIT ACCEPTANCE"}, {"Date": "03/03/2012", "Amount": "UNK", "Type": {"desc": "Unknown - Credit Extension, Review, Or Collection", "code": "31"}, "Terms": {"desc": null, "code": "N/A"}, "Subcode": "1224630", "KOB": {"desc": "Bank Credit Cards", "code": "BC"}, "SubscriberDisplayName": "DISCOVER FINANCIAL SER"}],
                "TradeLine": [{"SpecialComment": {"desc": null, "code": null}, "Evaluation": {"desc": "Closer review is required", "code": "N"}, "OpenDate": "11/28/2012", "StatusDate": "06/01/2013", "MaxDelinquencyDate": null, "AccountType": {"desc": "Installment Loan", "code": "78"}, "TermsDuration": {"desc": "10 Month", "code": "010"}, "ECOA": {"desc": "Individual", "code": "1"}, "Amount": [{"Value": "$688", "Qualifier": {"desc": "Original", "code": "O"}}, {"Value": "$557", "Qualifier": {"desc": "Charge off amount", "code": "C"}}], "BalanceDate": "03/28/2014", "BalanceAmount": "$557", "Status": {"desc": "Unpaid balance reported as loss", "code": "97"}, "AmountPastDue": "$640", "OpenOrClosed": {"desc": "Closed", "code": "C"}, "RevolvingOrInstallment": {"desc": "Installment", "code": "I"}, "ConsumerComment": null, "AccountNumber": "", "MonthsHistory": "14", "DelinquenciesOver30Days": "0", "DelinquenciesOver60Days": "1", "DelinquenciesOver90Days": "1", "DerogCounter": "10", "PaymentProfile": "999999999932CC", "MonthlyPaymentAmount": null, "MonthlyPaymentType": "Estimated", "LastPaymentDate": "02/08/2013", "Subcode": "2546487", "KOB": {"desc": "Personal Loan Companies", "code": "FP"}, "SubscriberDisplayName": "SUN LOAN COMPANY", "EnhancedPaymentData": {"InitialPaymentLevelDate": "06/01/2013", "AccountCondition": {"desc": "Unpaid balance reported as loss", "code": "97"}, "PaymentStatus": {"desc": "90 days past due", "code": "80"}, "AccountType": {"desc": "Installment Loan", "code": "78"}, "SpecialComment": {"desc": null, "code": null}}, "MaxPayment": null, "FirstDelinquencyDate": "03/01/2014", "SecondDelinquencyDate": "02/01/2014"}, {"SpecialComment": {"desc": null, "code": null}, "Evaluation": {"desc": "Closer review is required", "code": "N"}, "OpenDate": "12/17/2012", "StatusDate": "06/01/2013", "MaxDelinquencyDate": null, "AccountType": {"desc": "Unsecured Loan", "code": "01"}, "TermsDuration": {"desc": "7 Month", "code": "007"}, "ECOA": {"desc": "Individual", "code": "1"}, "Amount": [{"Value": "$546", "Qualifier": {"desc": "Original", "code": "O"}}], "BalanceDate": "06/28/2013", "BalanceAmount": "0", "Status": {"desc": "Debt included in or discharged through Bankruptcy Chapter 7, 11, or 12", "code": "67"}, "AmountPastDue": null, "OpenOrClosed": {"desc": "Closed", "code": "C"}, "RevolvingOrInstallment": {"desc": "Installment", "code": "I"}, "ConsumerComment": null, "AccountNumber": "", "MonthsHistory": "7", "DelinquenciesOver30Days": "0", "DelinquenciesOver60Days": "1", "DelinquenciesOver90Days": "0", "DerogCounter": "1", "PaymentProfile": "92--C-C", "MonthlyPaymentAmount": null, "MonthlyPaymentType": null, "LastPaymentDate": null, "Subcode": "0511070", "KOB": {"desc": "Personal Loan Companies", "code": "FP"}, "SubscriberDisplayName": "WORLD FINANCE CORP", "EnhancedPaymentData": {"InitialPaymentLevelDate": "06/01/2013", "AccountCondition": {"desc": "Debt included in or discharged through Bankruptcy Chapter 7, 11, or 12", "code": "67"}, "PaymentStatus": {"desc": "Unpaid balance reported as loss", "code": "97"}, "AccountType": {"desc": "Unsecured Loan", "code": "01"}, "SpecialComment": {"desc": null, "code": null}}, "MaxPayment": null, "FirstDelinquencyDate": "06/01/2013", "SecondDelinquencyDate": "05/01/2013"}, {"SpecialComment": {"desc": "ACCOUNT CLOSED DUE TO TRANSFER OR REFINANCE", "code": "28"}, "Evaluation": {"desc": "Closer review is required", "code": "N"}, "OpenDate": "08/06/2012", "StatusDate": "12/01/2012", "MaxDelinquencyDate": null, "AccountType": {"desc": "Unsecured Loan", "code": "01"}, "TermsDuration": {"desc": "7 Month", "code": "007"}, "ECOA": {"desc": "Individual", "code": "1"}, "Amount": [{"Value": "$546", "Qualifier": {"desc": "Original", "code": "O"}}], "BalanceDate": "12/28/2012", "BalanceAmount": null, "Status": {"desc": "Refinanced", "code": "10"}, "AmountPastDue": null, "OpenOrClosed": {"desc": "Closed", "code": "C"}, "RevolvingOrInstallment": {"desc": "Installment", "code": "I"}, "ConsumerComment": "Account closed due to refinance", "AccountNumber": "", "MonthsHistory": "5", "DelinquenciesOver30Days": "0", "DelinquenciesOver60Days": "0", "DelinquenciesOver90Days": "0", "DerogCounter": "0", "PaymentProfile": "BCCCC", "MonthlyPaymentAmount": null, "MonthlyPaymentType": null, "LastPaymentDate": null, "Subcode": "0511070", "KOB": {"desc": "Personal Loan Companies", "code": "FP"}, "SubscriberDisplayName": "WORLD FINANCE CORP", "EnhancedPaymentData": {"InitialPaymentLevelDate": "12/01/2012", "AccountCondition": {"desc": "Refinanced", "code": "10"}, "PaymentStatus": {"desc": "Current", "code": "11"}, "AccountType": {"desc": "Unsecured Loan", "code": "01"}, "SpecialComment": {"desc": "ACCOUNT CLOSED DUE TO TRANSFER OR REFINANCE", "code": "28"}}, "MaxPayment": null, "FirstDelinquencyDate": null, "SecondDelinquencyDate": null}, {"SpecialComment": {"desc": "ACCOUNT CLOSED DUE TO TRANSFER OR REFINANCE", "code": "28"}, "Evaluation": {"desc": "Closer review is required", "code": "N"}, "OpenDate": "05/06/2012", "StatusDate": "08/01/2012", "MaxDelinquencyDate": null, "AccountType": {"desc": "Unsecured Loan", "code": "01"}, "TermsDuration": {"desc": "6 Month", "code": "006"}, "ECOA": {"desc": "Individual", "code": "1"}, "Amount": [{"Value": "$414", "Qualifier": {"desc": "Original", "code": "O"}}], "BalanceDate": "08/28/2012", "BalanceAmount": null, "Status": {"desc": "Refinanced", "code": "10"}, "AmountPastDue": null, "OpenOrClosed": {"desc": "Closed", "code": "C"}, "RevolvingOrInstallment": {"desc": "Installment", "code": "I"}, "ConsumerComment": "Account closed due to refinance", "AccountNumber": "", "MonthsHistory": "4", "DelinquenciesOver30Days": "0", "DelinquenciesOver60Days": "0", "DelinquenciesOver90Days": "0", "DerogCounter": "0", "PaymentProfile": "BCCC", "MonthlyPaymentAmount": null, "MonthlyPaymentType": null, "LastPaymentDate": null, "Subcode": "0511070", "KOB": {"desc": "Personal Loan Companies", "code": "FP"}, "SubscriberDisplayName": "WORLD FINANCE CORP", "EnhancedPaymentData": {"InitialPaymentLevelDate": "08/01/2012", "AccountCondition": {"desc": "Refinanced", "code": "10"}, "PaymentStatus": {"desc": "Current", "code": "11"}, "AccountType": {"desc": "Unsecured Loan", "code": "01"}, "SpecialComment": {"desc": "ACCOUNT CLOSED DUE TO TRANSFER OR REFINANCE", "code": "28"}}, "MaxPayment": null, "FirstDelinquencyDate": null, "SecondDelinquencyDate": null}, {"SpecialComment": {"desc": "ACCOUNT TRANSFERRED TO ANOTHER LENDER", "code": "31"}, "Evaluation": {"desc": "Closer review is required", "code": "N"}, "OpenDate": "06/12/2007", "StatusDate": "02/01/2009", "MaxDelinquencyDate": null, "AccountType": {"desc": "Installment Sales Contract", "code": "06"}, "TermsDuration": {"desc": "22 Month", "code": "022"}, "ECOA": {"desc": "Individual", "code": "1"}, "Amount": [{"Value": "$991", "Qualifier": {"desc": "Original", "code": "O"}}], "BalanceDate": "02/01/2009", "BalanceAmount": null, "Status": {"desc": "Transferred", "code": "05"}, "AmountPastDue": null, "OpenOrClosed": {"desc": "Closed", "code": "C"}, "RevolvingOrInstallment": {"desc": "Installment", "code": "I"}, "ConsumerComment": "Transferred to another lender", "AccountNumber": "", "MonthsHistory": "19", "DelinquenciesOver30Days": "0", "DelinquenciesOver60Days": "0", "DelinquenciesOver90Days": "0", "DerogCounter": "0", "PaymentProfile": "BCCCCCCCCCC-CCCCCCC", "MonthlyPaymentAmount": null, "MonthlyPaymentType": null, "LastPaymentDate": null, "Subcode": "2326104", "KOB": {"desc": "Retail, Not Elsewhere Classified", "code": "ZR"}, "SubscriberDisplayName": "HEILIG MEYERS", "EnhancedPaymentData": {"InitialPaymentLevelDate": "02/01/2009", "AccountCondition": {"desc": "Transferred", "code": "05"}, "PaymentStatus": {"desc": "Current", "code": "11"}, "AccountType": {"desc": "Installment Sales Contract", "code": "06"}, "SpecialComment": {"desc": "ACCOUNT TRANSFERRED TO ANOTHER LENDER", "code": "31"}}, "MaxPayment": null, "FirstDelinquencyDate": null, "SecondDelinquencyDate": null}, {"SpecialComment": {"desc": null, "code": null}, "Evaluation": {"desc": "Closer review is required", "code": "N"}, "OpenDate": "07/28/2008", "StatusDate": "03/01/2009", "MaxDelinquencyDate": null, "AccountType": {"desc": "Collection Department/Agency/Attorney", "code": "48"}, "TermsDuration": {"desc": "1 Month", "code": "001"}, "ECOA": {"desc": "Individual", "code": "1"}, "Amount": [{"Value": "$597", "Qualifier": {"desc": "Original", "code": "O"}}], "BalanceDate": "03/28/2009", "BalanceAmount": null, "Status": {"desc": "Paid/was collection account, insurance or government claim or terminated for default", "code": "62"}, "AmountPastDue": null, "OpenOrClosed": {"desc": "Closed", "code": "C"}, "RevolvingOrInstallment": {"desc": "Installment", "code": "I"}, "ConsumerComment": "Original creditor: AT&T BROADBAND OF MISSOURI  IN", "AccountNumber": "", "MonthsHistory": "7", "DelinquenciesOver30Days": "0", "DelinquenciesOver60Days": "0", "DelinquenciesOver90Days": "0", "DerogCounter": "2", "PaymentProfile": "B---9-9", "MonthlyPaymentAmount": null, "MonthlyPaymentType": null, "LastPaymentDate": null, "Subcode": "3980798", "KOB": {"desc": "Other Collection Agencies", "code": "YC"}, "SubscriberDisplayName": "CREDIT MANAGEMENT LP", "EnhancedPaymentData": {"InitialPaymentLevelDate": "03/01/2009", "AccountCondition": {"desc": "Paid/zero balance", "code": "A2"}, "PaymentStatus": {"desc": "Seriously past due", "code": "93"}, "AccountType": {"desc": "Collection Department/Agency/Attorney", "code": "48"}, "SpecialComment": {"desc": null, "code": null}}, "MaxPayment": null, "FirstDelinquencyDate": "11/01/2008", "SecondDelinquencyDate": "09/01/2008"}, {"SpecialComment": {"desc": null, "code": null}, "Evaluation": {"desc": "Closer review is required", "code": "N"}, "OpenDate": "10/01/2013", "StatusDate": "11/01/2013", "MaxDelinquencyDate": null, "AccountType": {"desc": "Collection Department/Agency/Attorney", "code": "48"}, "TermsDuration": {"desc": "1 Month", "code": "001"}, "ECOA": {"desc": "Individual", "code": "1"}, "Amount": [{"Value": "$213", "Qualifier": {"desc": "Original", "code": "O"}}], "BalanceDate": "11/09/2013", "BalanceAmount": "$213", "Status": {"desc": "Seriously past due", "code": "93"}, "AmountPastDue": null, "OpenOrClosed": {"desc": "Closed", "code": "C"}, "RevolvingOrInstallment": {"desc": "Installment", "code": "I"}, "ConsumerComment": "Original creditor: DIRECTV  INC.", "AccountNumber": "", "MonthsHistory": "1", "DelinquenciesOver30Days": "0", "DelinquenciesOver60Days": "0", "DelinquenciesOver90Days": "0", "DerogCounter": "1", "PaymentProfile": "9", "MonthlyPaymentAmount": null, "MonthlyPaymentType": null, "LastPaymentDate": null, "Subcode": "1985126", "KOB": {"desc": "Other Collection Agencies", "code": "YC"}, "SubscriberDisplayName": "NCO FIN/NA", "EnhancedPaymentData": {"InitialPaymentLevelDate": "11/01/2013", "AccountCondition": {"desc": null, "code": null}, "PaymentStatus": {"desc": "Seriously past due", "code": "93"}, "AccountType": {"desc": "Collection Department/Agency/Attorney", "code": "48"}, "SpecialComment": {"desc": null, "code": null}}, "MaxPayment": null, "FirstDelinquencyDate": "11/01/2013", "SecondDelinquencyDate": null}, {"SpecialComment": {"desc": null, "code": null}, "Evaluation": {"desc": "Closer review is required", "code": "N"}, "OpenDate": "12/21/2010", "StatusDate": "06/01/2010", "MaxDelinquencyDate": null, "AccountType": {"desc": "Collection Department/Agency/Attorney", "code": "48"}, "TermsDuration": {"desc": "Unknown", "code": "N/A"}, "ECOA": {"desc": "Individual", "code": "1"}, "Amount": [{"Value": "$49", "Qualifier": {"desc": "Original", "code": "O"}}], "BalanceDate": "06/15/2011", "BalanceAmount": "$34", "Status": {"desc": "Seriously past due", "code": "93"}, "AmountPastDue": "$34", "OpenOrClosed": {"desc": "Closed", "code": "C"}, "RevolvingOrInstallment": {"desc": "Installment", "code": "I"}, "ConsumerComment": "Original creditor: BOONE ELECTRIC COOPERATIVE", "AccountNumber": "", "MonthsHistory": "13", "DelinquenciesOver30Days": "0", "DelinquenciesOver60Days": "0", "DelinquenciesOver90Days": "0", "DerogCounter": "2", "PaymentProfile": "9-----------9", "MonthlyPaymentAmount": null, "MonthlyPaymentType": null, "LastPaymentDate": null, "Subcode": "2989784", "KOB": {"desc": "Other Collection Agencies", "code": "YC"}, "SubscriberDisplayName": "MEDICREDIT CORP", "EnhancedPaymentData": {"InitialPaymentLevelDate": "06/01/2010", "AccountCondition": {"desc": null, "code": null}, "PaymentStatus": {"desc": "Seriously past due", "code": "93"}, "AccountType": {"desc": "Collection Department/Agency/Attorney", "code": "48"}, "SpecialComment": {"desc": null, "code": null}}, "MaxPayment": null, "FirstDelinquencyDate": "06/01/2011", "SecondDelinquencyDate": "06/01/2010"}, {"SpecialComment": {"desc": null, "code": null}, "Evaluation": {"desc": "Closer review is required", "code": "N"}, "OpenDate": "06/12/2007", "StatusDate": "05/01/2010", "MaxDelinquencyDate": "01/01/2012", "AccountType": {"desc": "Revolving Charge Account", "code": "07"}, "TermsDuration": {"desc": "Revolving", "code": "REV"}, "ECOA": {"desc": "Individual", "code": "1"}, "Amount": [{"Value": "$677", "Qualifier": {"desc": "High balance", "code": "H"}}], "BalanceDate": "03/18/2014", "BalanceAmount": "$567", "Status": {"desc": "180 days past due", "code": "84"}, "AmountPastDue": "$270", "OpenOrClosed": {"desc": "Open", "code": "O"}, "RevolvingOrInstallment": {"desc": "Revolving", "code": "R"}, "ConsumerComment": null, "AccountNumber": "", "MonthsHistory": "47", "DelinquenciesOver30Days": "0", "DelinquenciesOver60Days": "0", "DelinquenciesOver90Days": "36", "DerogCounter": "0", "PaymentProfile": "66-6666666666-6666-6-6--6", "MonthlyPaymentAmount": "$45", "MonthlyPaymentType": "Scheduled Term", "LastPaymentDate": "04/19/2009", "Subcode": "1983611", "KOB": {"desc": "Finance Companies -- Non-Specific", "code": "FZ"}, "SubscriberDisplayName": "HEILIG MEYERS MASTERS", "EnhancedPaymentData": {"InitialPaymentLevelDate": "05/01/2010", "AccountCondition": {"desc": "Open", "code": "A1"}, "PaymentStatus": {"desc": "180 days past due", "code": "84"}, "AccountType": {"desc": "Revolving Charge Account", "code": "07"}, "SpecialComment": {"desc": null, "code": null}}, "MaxPayment": {"desc": "180 days delinquent", "code": "6"}, "FirstDelinquencyDate": "03/01/2014", "SecondDelinquencyDate": "02/01/2014"}],
                "RiskModel": [{"Score": "408", "Evaluation": {"desc": null, "code": null}, "ModelIndicator": {"desc": "Vantage Score 3.0", "code": "V3"}, "ScoreFactorCodeOne": "98", "ScoreFactorCodeTwo": "15", "ScoreFactorCodeThree": "08", "ScoreFactorCodeFour": "07", "ScoreFactorCodeFive": "84", "positiveScoreFactorCodeOne": "P49", "positiveScoreFactorCodeTwo": "P95", "positiveScoreFactorCodeThree": "P88", "positiveScoreFactorCodeFour": "P14"}],
                "ConsumerAssistanceReferralAddress": {"OfficeName": "EXPERIAN", "StreetName": "701 EXPERIAN PARKWAY", "POBox": "PO BOX 2002", "CityStateZip": "ALLEN, TX 75013", "Phone": "(888) 397-3742"},
                "ProfileSummary": {"DisputedAccountsExcluded": 0, "DelinquenciesOver30Days": 0, "DelinquenciesOver60Days": 0, "DelinquenciesOver90Days": 0, "DerogCounter": 0, "PublicRecordsCount": 0, "TotalInquiries": 0, "MonthlyPaymentPartialFlagDesc": null, "InquiriesDuringLast6Months": 0, "NowDelinquentDerog": 0, "RealEstatePaymentPartialFlagDesc": null, "TotalTradeItems": 0, "WasDelinquentDerog": 0, "RevolvingAvailablePartialFlagDesc": null, "PaidAccounts": 0, "hasProfileSummary": false, "InstallmentBalance": null, "MonthlyPayment": null, "PastDueAmount": null, "RealEstateBalance": null, "RealEstatePayment": null, "RevolvingBalance": null, "RevolvingAvailablePercent": null, "OldestTradeOpenDate": null, "Y2KOldestTradeline": null, "SatisfactoryAccount": 0},
                "Statement": null,
                "InformationalMessage": [{"MessageText": "0084 SSN MATCHES", "MessageNumber": "84"}]};

    }
])

.controller('TenantDashboardCtrl', ['$scope','$rootScope','$timeout','$modal','rentedProfile','tenantService','propertyService',
    function($scope,$rootScope,$timeout,$modal,rentedProfile,tenantService,propertyService) {

       $scope.time= new Date();

       $timeout(function ()
       {
          $scope.time= new Date();
       },60000);

       $scope.accepted= function (property)
       {
            $modal.open
            ({
                templateUrl: 'tenant/owner-details.tpl.html',
                controller: 'TenantOwnerCtrl',
                size: 'lg',
                resolve: {  
                           property: function () { return property; }
                         }
            });
       };

       var properties= {};

       $scope.offersNo= 0;

       $scope.isAccepted= function (property,profile)
       {
          if (!property.bestOffer) return false;
          if (!profile) return false;
          if (properties[property.$id]!==undefined) return properties[property.$id];

          
          var accepted= properties[property.$id]= (property.bestOffer.userId==profile.$id
                                                   &&!!property.bestOffer.accepted);

          if (!accepted&&!property.bestOffer.accepted)
            $scope.offersNo++;
            
          return accepted;
       };

       rentedProfile(function (profile)
       {
             tenantService.watchlist(profile.$id)
                .$inst().$ref().on('value',function (data)
             {
                 $scope.watchlist= _.map(data.val(),function ($id) { return { $id: $id }; });
             });

             propertyService.fetchRecentlyBiddedProperties(profile.$id,4)
                .$inst().$ref().on('value',function (data)
                { 
                    properties= {};
                    $scope.offersNo= 0;
                    $scope.properties= _.map(_.keys(data.val()),function ($id) { return { $id: $id }; });
                });
       });

       $scope.expenses= {
                          upcomingVacancies: 59,
                          rentsPaid: 77,
                          expenseRatio: 90,
                          occupancyRate: 95
                        };


        // @TODO: just here for the demo, but pretty ugly
        var currentMonth = moment().format('YYYY-MM');
        var nextMonth    = moment().add('month', 1).format('YYYY-MM');

        var events = [
            { date: currentMonth + '-' + '10', title: 'Persian Kitten Auction', location: 'Center for Beautiful Cats' },
            { date: currentMonth + '-' + '19', title: 'Cat Frisbee', location: 'Jefferson Park' },
            { date: currentMonth + '-' + '23', title: 'Kitten Demonstration', location: 'Center for Beautiful Cats' },
            { date: nextMonth + '-' + '07',    title: 'Small Cat Photo Session', location: 'Center for Cat Photography' }
          ];

        $('#mini-clndr').clndr({
            daysOfTheWeek: ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'],
            template: $('#mini-clndr-template').html(),
            events: events,
            clickEvents: {
              click: function(target) {
                if(target.events.length) {
                  var daysContainer = $('#mini-clndr').find('.days-container');
                  daysContainer.toggleClass('show-events', true);
                  $('#mini-clndr').find('.x-button').click( function() {
                    daysContainer.toggleClass('show-events', false);
                  });
                }
              }
            },
            adjacentDaysChangeMonth: true
          });

    }
])

.controller('TenantPropertiesCtrl', ['$scope','$rootScope','$routeParams','rentedProfile','tenantService','propertyService','TopBannerChannel','mailService',
    function($scope,$rootScope,$routeParams,rentedProfile,tenantService,propertyService,TopBannerChannel,mailService) {

      var watchlist;

         rentedProfile(function (profile)
         {
             (watchlist=tenantService.watchlist(profile.$id))
                .$inst().$ref().on('value',function (data)
             {
                 $scope.watchlist= _.map(_.values(data.val(),'$value'),function ($id) { return { $id: $id }; });
             });

             propertyService.fetchRecentlyBiddedProperties(profile.$id,4)
                .$inst().$ref().on('value',function (data)
                { 
                    $scope.properties= _.map(_.keys(data.val()),function ($id) { return { $id: $id }; });
                });
         });

     $scope.unwatch= function (property)
     {
         unwatch(property,watchlist,TopBannerChannel,mailService,$rootScope,propertyService);
     };

     $scope.cancelBid= function (property)
     {
            if (!confirm('Please confirm that you would like to retire your offer')) return;

            var bid= _.findWhere(property.bids,{ userId: $rootScope.profile.$id });

            if (bid)
            propertyService.cancelBid(bid,property,function (err)
            {
                if (err)
                {
                    console.log(err);

                    TopBannerChannel.setBanner({
                        content: 'There was an error deleting your offer',
                        contentClass: 'danger'
                    });
                }
                else
                {
                    TopBannerChannel.setBanner({
                        content: 'Offer retired!',
                        contentClass: 'success'
                    });

                    mailService.send(property.owner,
                                     'owner-offer-deleted',
                                     { propertyname: property.address.street,
                                       propertyid: property.$id });

                    mailService.send(bid.userId,
                                     'tenant-offer-deleted',
                                     { propertyname: property.address.street,
                                       propertyid: property.$id });
                }
            });
     };

    }
])

.controller('TenantProfileCtrl', ['$scope','$rootScope','$routeParams','TopBannerChannel','MAX_UPLOAD_SIZE','MAX_PROOF_INCOME','shout','loginService','compressImage','mailService',
    function($scope,$rootScope,$routeParams,TopBannerChannel,MAX_UPLOAD_SIZE,MAX_PROOF_INCOME,shout,loginService,compressImage,mailService) {

       $scope.password= {};
       $scope.page= 1;
       $scope.shout= $scope.shout || {};

       var shouter= shout($scope),
           shoutUpload= shout($scope,'shoutUpload');

       var states= $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

       $scope.statesPattern= '/^('+states.join('|')+')$/'


       $scope.proofSelected= function ($files,profile)
       {
            console.log($files);

            profile.financial= profile.financial || {};

            profile.financial.proofsOfIncome= profile.financial.proofsOfIncome || [];

            if (($files.length+profile.financial.proofsOfIncome.length)>MAX_PROOF_INCOME)
            {
                shoutUpload
                ({
                    content: 'You can upload up to '+MAX_PROOF_INCOME+' documents',
                    type: 'danger'
                });

                return;
            }

            _.each($files,function (file)
            {
                if (file.size>MAX_UPLOAD_SIZE)
                {
                    shoutUpload
                    ({
                        content: 'Documents should be up to 5MB, file '+
                                 file.name+' is '+(file.size/1024/1024)+'MB',
                        type: 'danger'
                    });

                    return;
                }

                var fileReader= new FileReader();
                
                fileReader.onload= function (e)
                {
                    profile.financial.proofsOfIncome.push({ name: file.name, data: e.target.result, size: file.size });
                    $scope.$apply();
                };
                
                fileReader.readAsDataURL(file);

            });
       };

       $scope.pictureSelected= function ($files)
       {
            if (!$files[0]) return;

            var file = $files[0];

            console.log(file);

            if (file.size>MAX_UPLOAD_SIZE)
            {
                shouter
                ({
                    content: 'The picture should be up to 5MB',
                    type: 'danger'
                });

                return;
            }

            var fileReader= new FileReader();
            
            fileReader.onload= function (e)
            {
                 compressImage(file.type,e.target.result,
                 function (dataURL)
                 {
                      $rootScope.profile.picture= dataURL;
                      $scope.$apply();
                 });
            };
            
            fileReader.readAsDataURL(file);
       };

       $scope.removeProofOfIncome= function (file,profile)
       {
           if (!confirm('You want to remove this document?')) return;

          _.rm(profile.financial.proofsOfIncome,file);
       };

       $scope.save= function (profile,password)
       {
           $scope.showErrors= false;

           if ($scope.profileForm.$invalid)
           {
              $scope.showErrors= true;

              shouter
              ({
                    content: 'Please correct the highlighted fields on your profile',
                    type: 'danger'
              });

              return;
           } 

         //Commented out the proof of income requirement for now
         /*  if (!profile.financial||!profile.financial.proofsOfIncome||profile.financial.proofsOfIncome.length<1)
           {
              $scope.showErrors= true;

              shouter
              ({
                    content: 'Please upload at least one proof of income',
                    type: 'danger'
              });

              return;
           }*/

           password= password || {};

           if (password.change&&password.change!=password.confirmChange)
           {
              TopBannerChannel.setBanner({
                  content: 'The password and confirm does not match',
                  contentClass: 'danger'
              });

              return;
           }

           shouter
           ({
                content: 'Saving your profile...',
                type: 'info'
           });

           profile.completedOnBoarding= true;

           var success= function ()
               {
                    shouter
                    ({
                        content: 'Profile saved!',
                        type: 'success'
                    });

                    mailService.send(profile.$id,
                                     'tenant-profile-updated',
                                     { fname: profile.firstName });
               };

           profile.$save()
           .then(function ()
           {
                if (password.change)
                  loginService.changePassword
                  ({
                      email: profile.authEmail,

                      oldpass: password.old,

                      newpass: password.change,

                      confirm: password.confirmChange,

                      callback: function (err)
                      {
                              if (err)
                              {
                                    console.log(err);

                                    shouter
                                    ({
                                        content: 'There was an error changing your password',
                                        type: 'danger'
                                    });
                              }
                              else
                              {
                                password.old = password.change = password.confirmChange= null;
                                
                                success();
                              }
                      }
                   });
                else
                   success();

           },
           function (err)
           {
                conole.log(err);

                shouter
                ({
                    content: 'There was an error saving your profile',
                    type: 'danger'
                });
           });
       };

    }
])

.controller('TenantBidCtrl', ['$scope','$rootScope','$location','$routeParams','TopBannerChannel','tenantService','rentedProfile','propertyService','mailService',
    function($scope,$rootScope,$location,$routeParams,TopBannerChannel,tenantService,rentedProfile,propertyService,mailService)
{
     var watchlist;

     rentedProfile(function (profile)
     {
         $scope.gotProfile= true;
         watchlist= $scope.watchlist= profile ? tenantService.watchlist(profile.$id) : [];
     });

     var inWatchlist= $scope.inWatchlist= function (property)
     {
       return watchlist&&_.findWhere(watchlist,{ $value: property.$id });
     };
     
     $scope.property.$loaded(function ()
     {
         var property= $scope.property;

         $scope.bid= { 
                      rentAmount: property.targetRent,
                      moveInDate: property.availableDate,
                       leaseTerm: +property.leaseTerm
                     };

         $scope.terms= [
                          { months: 1, desc: 'Month-to-month' },
                          { months: 6, desc: '6 months' },
                          { months: 9, desc: '9 months' },
                          { months: 12, desc: '1 year' },
                          { months: 24, desc: '2 years' },
                          { months: 36, desc: '3 years' }
                       ];

         $scope.terms= _.filter($scope.terms,function (t)
                       {
                           if (property.leaseTerm==1)
                             return t.months==1; 
                           else
                             return t.months>1&&t.months<=property.leaseTerm; 
             /* Need to fix this condition statement */
                       });

     });

     var checkForMyOffer= _.debounce(function ()
         {
             if (!$rootScope.profile) return;

             var mine= _.findWhere($scope.property.bids,{ userId: $rootScope.profile.$id });

             if (mine)
             {
               $scope.bid= mine;
               $scope.$apply();
             }
         },200);

     $scope.$watch('property.bids[0].userId',function (bids)
     {
         if (bids)
           checkForMyOffer();
     });

     $scope.watch= function (property)
     {
           var _watch= function ()
               {
                   if (!inWatchlist(property))
                     watchlist.$add(property.$id)
                       .then(function ()
                       {
                            propertyService.addWatcher(property.$id, $rootScope.profile.$id,
                            function (err)
                            {
                                if (err)
                                {
                                    conole.log(err);

                                    TopBannerChannel.setBanner
                                    ({
                                        content: 'There was an error adding the property to your watchlist',
                                        type: 'danger'
                                    });
                                }
                                else
                                {
                                    TopBannerChannel.setBanner
                                    ({
                                        content: 'Property added to your watchlist!',
                                        type: 'success'
                                    });

                                    mailService.send(property.owner,
                                                     'owner-property-watched',
                                                     { propertyname: property.address.street,
                                                         propertyid: property.$id });

                                    mailService.send($rootScope.profile.$id,
                                                     'tenant-property-watch',
                                                     { propertyname: property.address.street,
                                                         propertyid: property.$id });
                                }
                            });
                       },
                       function (err)
                       {
                            conole.log(err);

                            TopBannerChannel.setBanner
                            ({
                                content: 'There was an error adding the property to your watchlist',
                                type: 'danger'
                            });
                       });
               };

           if (!$rootScope.profile) // logged out
           {
                $rootScope.trackAddToWatchlist= _watch;
                $location.path('/tenants/myprofile');
           }
           else
              _watch();
     };

     $scope.unwatch= function (property)
     {
         unwatch(property,watchlist,TopBannerChannel,mailService,$rootScope,propertyService);
     };


     $scope.makeAnOffer= function (bid,property)
     {
           var _bid= function ()
               {
                   propertyService.placeBid(property.$id, property.owner, $rootScope.profile.$id, bid,
                   function (err)
                   {
                        if (err)
                        {
                            console.log(err);

                            TopBannerChannel.setBanner
                            ({
                                content: 'There was an error submitting your bid',
                                type: 'danger'
                            });
                        }
                        else
                        {
                            TopBannerChannel.setBanner
                            ({
                                content: 'Offer submitted!',
                                type: 'success'
                            });

                            mailService.send(property.owner,
                                             'owner-offer-created',
                                             { propertyname: property.address.street });

                            mailService.send($rootScope.profile.$id,
                                             'tenant-offer-created',
                                             { propertyname: property.address.street,
                                               propertyid: property.$id });
                        }

                        $rootScope.$apply(); // TopBannerChannel.setBanner does not apply...
                   }); 
               };

           if (!$rootScope.profile) // logged out
           {
                $rootScope.trackBid= _bid;
                $location.path('/tenants/myprofile');
           }
           else
              _bid();
     };


     $scope.editMyBid= function (bid,property)
     {
            if (!confirm('Please confirm that you would like to change your offer')) return;

            propertyService.editBid(_.omit(bid,['$$hashKey','user']),property,function (err)
            {
                if (err)
                {
                    console.log(err);

                    TopBannerChannel.setBanner({
                        content: 'There was an error changing your offer',
                        contentClass: 'danger'
                    });
                }
                else
                {
                    TopBannerChannel.setBanner({
                        content: 'Offer changed!',
                        contentClass: 'success'
                    });

                    mailService.send(property.owner,
                                     'owner-offer-updated',
                                     { propertyname: property.address.street });

                }
            });
     };

     $scope.open = function($event)
     {
         $event.preventDefault();
         $event.stopPropagation();
  
         $scope.opened= true;
     };
}])

.controller('TenantOwnerCtrl', ['$scope','$modalInstance','property','syncData',
    function($scope,$modalInstance,property,syncData) 
{
  $scope.property= property;

  $scope.owner= syncData('users/'+property.owner).$asObject();

  $scope.cancel= function ()
  {
     $modalInstance.dismiss('cancel');
  };
}]);
