"use strict";

var path = require("path"),
    http = require("http"),
    https = require("https"),
    request = require("request"),
    config = require("../config/config"),
    logger =  require("../config/logger");

/**
 *
 * @param req  req.body.creditReportRequestorInfo: { firstName: 'firstName' , lastName:
 *                  'lastName', currentAddress: 'currentAddress', currentCity: 'currentCity',
 *                  currentState: 'currentState', currentZip: 'currentZip', [ssn: 'ssn']
 *              }
 * @returns {{valid: boolean}} or valid: false, errors: {}
 */
function _validateGetCreditReportRequest(req) {

    var crr = req.param("creditReportRequestorInfo");
//    console.log(crr);
    if(!crr || !crr.firstName || !crr.lastName  || !crr.currentAddress || !crr.currentCity ||
        !crr.currentState || !crr.currentZip ) {
        return { valid: false, errors:[ "missing required fields" ] };
    }
    else {
        return { valid: true };
    }
}

/**
 *
 * @param req   req.body.creditReportRequestorInfo: { firstName: 'firstName' ,
 *                  lastName: 'lastName', currentAddress: 'currentAddress', currentCity: 'currentCity',
 *                  currentState: 'currentState', currentZip: 'currentZip', [ssn: 'ssn']
 *              }
 * @param res
 * @param next
 */
exports.getCreditReport = function (req, res, next) {

    var validQuery = _validateGetCreditReportRequest(req);

    if (!validQuery.valid) {

        res.json( JSON.parse(validQuery));
        return;
    }

    logger.log("info", "Client query to pass to Experian: ", JSON.stringify(req.body.creditReportRequestorInfo));

    var options = {
        url: config.experian.ip + "/" + config.experian.paths.getOwnReport,
        form: req.body.creditReportRequestorInfo,
        auth: {
            user: config.experian.auth.rented.username,
            pass: config.experian.auth.rented.password
        },
        headers: {
            Accept: "application/json"
        }
    };


    request.post(options, function(err, httpResponse, body) {
        if(err) {
            console.log("error: ", err);
            res.json( JSON.parse({error: err}) );
        }

        res.json(JSON.parse(body));

    });
};



/**
 * Begin the process of creating an authenticated Connect user. If the name and address are found in
   Experian’s system, a set of questions is returned to help verify the identity of the consumer. Once the
   questions are answered in the subsequent service call, the userToken is created and returned to the
   client.
 *
 * @param req  req.body.creditReportRequestorInfo: { firstName: 'firstName' , lastName: 'lastName', currentAddress:
 *                  'currentAddress', currentCity: 'currentCity', currentState: 'currentState', currentZip:
 *                  'currentZip', , [ssn: 'ssn']
 *              }
 * @param res  { QuestionSet: [ { QuestionType: integer, QuestionText: 'question', QuestionSelect: { QuestionChoice: [ 'value1'
 *                 'value2', .... ]  } }, ..... ],
 *                 authSession: "token",
 *                 error: object | 'string',
 *                 success: boolean
 */
exports.authAndCreateUser = function (req, res, next) {

    //var validQuery = _validateAuthAndCreateUserRequest(req);
    //
    //if (!validQuery.valid) {
    //
    //    res.json( JSON.parse(validQuery));
    //    return;
    //}

    logger.log("info", "Client query to pass to Experian: ", JSON.stringify(req.body.creditReportRequestorInfo));

    var options = {
        url: config.experian.ip + config.experian.paths.getOwnReport,
        form: req.body.creditReportRequestorInfo,
        auth: {
            user: config.experian.auth.rented.username,
            pass: config.experian.auth.rented.password
        },
        headers: {
            Accept: "application/json"
        }
    };


    request.post(options, function(err, httpResponse, body) {
        if(err) {
            console.log("error: ", err);
            res.json( JSON.parse({error: err}) );
        }

        var jsonBody = JSON.parse(body);


        var queryResult = { QuestionSet: jsonBody.preciseIDServer.KBA.QuestionSet,
            authSession:  jsonBody.authSession,
            error: jsonBody.error,
            success: jsonBody.success };

        console.log(queryResult);

        res.json(queryResult);

    });
};


/**
 *  The second part of the user registration process. This must include an authorization seesion token that was
    returned as part of the original /user request that retrieved the question. @see authAndCreateUser()
 *
 * @param req     req.body.creditReportRequestorInfo: {  authSession: 'auth session token',
 *                  answer : [ integer for index of answer option starting from 1,
 *                  integer for index of answer option starting from 1, ... ] }
 *
 *
 * @param res  success { success: true, UserToken: string };
 *             failure { success: false, errorType: 'user | system', error: object | string};  TODO investigate errors more
 */
exports.submitAuthenticateAnswers = function (req, res, next) {

    logger.log("info", "Client submitAuthenticateAnswers query payload to pass to Experian: ",
       req.body.creditReportRequestorInfo);


    var options = {
        url: config.experian.ip + config.experian.paths.submitAuthAnswers,
        form: req.body.creditReportRequestorInfo,
        useQuerystring: true,  // so answer=1&answer=2
        auth: {
            user: config.experian.auth.rented.username,
            pass: config.experian.auth.rented.password
        },
        headers: {
            Accept: "application/json"
        }
    };


    request.post(options, function(err, httpResponse, body) {

        var queryResult;

        if(err) {
            console.log("error: ", err);
            queryResult = { success: false, errorType: 'system', error: err };
            res.json( queryResult );
        }
        else {

            var jsonBody = JSON.parse(body);


            if(!jsonBody.success) {
                queryResult = { success: false, errorType: 'user', error: jsonBody.error };
            }
            else {
                queryResult = {
                    success: true,
                    UserToken: jsonBody.UserToken
                };
            }

            console.log(queryResult);
            res.json(queryResult);

        }
    });
};



/**
 * Check authentication status for existing user with their token
 *
 * @param req  req.body = { userToken: string }
 * @param res  success { "success": true, "authenticated": true }
 *             failure { success: false, errorType: 'system', error: object | string};  TODO investigate errors more
 */
exports.getAuthStatus = function (req, res, next) {

    logger.log("info", "getAuthStatus() user token to pass to Experian: ",
        req.param("userToken"));

    var options = {
        url: config.experian.ip + config.experian.paths.getAuthStatus + req.param("userToken"),
        auth: {
            user: config.experian.auth.rented.username,
            pass: config.experian.auth.rented.password
        },
        headers: {
            Accept: "application/json"
        }
    };


    request.get(options, function(err, httpResponse, body) {

        var queryResult;

        if (err) {
            logger.log("error", err);
            console.log("error: ", err);

            queryResult = {success: false, errorType: 'system', error: err};
        }
        else {

            var jsonBody = JSON.parse(body);

            if (!jsonBody.success) {
                queryResult = {success: false, errorType: 'system', error: jsonBody.error};
            }
            else {
                queryResult = {
                    success: true,
                    authenticated: jsonBody.authenticated
                };
            }

            console.log(queryResult);
        }

        res.json(queryResult);
    });
};


/**
 *  After a token’s authenticated status has expired, re-authenticate a userToken
 *  Do NOT call this method if the user is already authenticated ... you can first check with getAuthStatus()
 *
 * @param req   userToken should be in the url
 * @param res  { QuestionSet: [ { QuestionType: integer, QuestionText: 'question', QuestionSelect: { QuestionChoice: [ 'value1'
 *                 'value2', .... ]  } }, ..... ],
 *                 authSession: "token",
 *                 error: object | 'string',  TODO investigate errors more
 *                 success: boolean }
 */
exports.reAuthExistingToken = function (req, res, next) {

    logger.log("info", "reAuthExistingToken() user token to pass to Experian: ",
        req.param("userToken"));

    //TODO first call getAuthStatus() and only call reauth if you need to


    var options = {
        url: config.experian.ip + config.experian.paths.getAuthStatus + req.param("userToken"),
        auth: {
            user: config.experian.auth.rented.username,
            pass: config.experian.auth.rented.password
        },
        headers: {
            Accept: "application/json"
        }
    };

    request.get(options, function(err, httpResponse, body) {

        var queryResult;

        if (err) {
            logger.log("error", err);
            console.log("error: ", err);

            queryResult = {success: false, error: err};
        }
        else {

            console.log("BODY:  ", body);

            var jsonBody = JSON.parse(body);

            if (!jsonBody.success) {
                queryResult = {success: false, error: jsonBody.error};
            }
            else {

                queryResult = { QuestionSet: jsonBody.preciseIDServer.KBA.QuestionSet,
                    authSession:  jsonBody.authSession,
                    success: true };
            }

            console.log(queryResult);
        }

        res.json(queryResult);
    });
};


/**
 *  Answer questions returned from the /ECP2P/api/auth/{tokenId} service  ..... @see reAuthExistingToken()
 *
 *
 * @param req  userToken should be in the url
 *        req.body = {  authSession: 'auth session token', answer : [ integer for index of answer option starting from 1,
  *      integer for index of answer option starting from 1, ... ] }
 * @param res  success { success: true };
 *             failure { success: false, errorType: 'user | system', error: object | string};  TODO investigate errors more
 */
exports.submitAnswersReauthExistingToken = function (req, res, next) {

    logger.log("info", "reAuthExistingToken() user token to pass to Experian: ", req.param("userToken"),
                "body payload to pass: ", req.body);


    var options = {
        url: config.experian.ip + config.experian.paths.getAuthStatus + req.param("userToken"),
        form: req.body,
        useQuerystring: true,  // so answer=1&answer=2
        auth: {
            user: config.experian.auth.rented.username,
            pass: config.experian.auth.rented.password
        },
        headers: {
            Accept: "application/json"
        }
    };

    request.post(options, function(err, httpResponse, body) {

        var queryResult;

        if (err) {
            logger.log("error", err);
            console.log("error: ", err);

            queryResult = { success: false, errorType: 'system', error: err };
        }
        else {

            console.log("BODY:  ", body);

            var jsonBody = JSON.parse(body);

            if (!jsonBody.success) {
                queryResult = { success: false, errorType: 'user', error: jsonBody.error };
            }
            else {

                queryResult = {
                    success: true
                };
            }

            console.log(queryResult);
        }

        res.json(queryResult);
    });
};


/**
 * Get the Connect credit report and Vantagescore. This request is for a credit report that is shown to the
   consumer specifically. The report can then be shared by referencing the transactionId in a following
   service.

 * @param req
 * @param res
 * @param next
 */
exports.getConsumerCreditReport = function (req, res, next) {

//    URL: /ECP2P/api/report
//
//    request.post();
//
//    Sample Request:
//
//        curl –i -k -H "Accept: application/json" -u username:password "https://stg1-
//
//    ss6.experian.com/ECP2P/api/report -d
//
//    'productId=1&consumerToken=MWNiNjZlM2MtNzA4My00ZDA3LWI3ODMtZjdiZjg2OWM2YWQy
//
//    &purposeType=3' -H "Accept: application/json" -X POST
//
//    Parameters:
//
//        productId ( 1 | 9 )
//
//    consumerToken
//
//    purposeType
//
//    Response Fields:
//
//        TransactionId
//
//    CreditReportJSON
};


/**
 *  Share a consumer credit report previously purchased that qualifies for sharing.
 *
 * @param req
 * @param res
 * @param next
 */
exports.getConsumerCreditReport = function (req, res, next) {

//    URL: /ECP2P/api/share
//    request.post();
//
//    Sample Request:
//
//        –i -k -H "Accept: application/json" -u username:password "https://stg1-
//
//    ss6.experian.com/ECP2P/api/share -d
//
//    'consumerToken=MWNiNjZlM2MtNzA4My00ZDA3LWI3ODMtZjdiZjg2OWM2YWQy& endUserToken
//
//        =ZTZjMGZkNzgtMDg4ZC00Y2UxLWE0ODctNDgyMTNhMjYxZGI3&purposeType=3& 'transactionId =ZZZZ'
//
//        -H "Accept: application/json" -X POST
//
//    Parameters:
//
//        consumerToken
//
//    endUserToken
//
//    purposeType
//
//    transactionId
//
//    Response Fields:
//
//        ShareId
//
//    Sample Response: TODO
};


/**
 * Retrieve a copy of the shared report. This can be called multiple times to retrieve previously pulled
   reports. This retrieves an archived copy of the report and is not considered a new transaction.
 *
 * @param req
 * @param res
 * @param next
 */
exports.retrieveSharedConsumerCreditReportForEndUser = function (req, res, next) {
//    URL: /ECP2P/api/share/get
//
//    Method: POST
//
//    Sample Request:
//
//        –i -k -H "Accept: application/json" -u username:password "https://stg1-ss6.experian.com/ECP2P
//
//    api/share/get
//
//    -d endUserToken=MWNiNjZlM2MtNzA4My00ZDA3LWI3ODMtZjdiZjg2OWM2YWQy &shareId=34' -H
//
//    "Accept: application/json" -X POST
//
//    Parameters:
//
//        shareId
//
//    endUserToken
//
//    Response Fields:
//
//        CreditReportJSON
//
//    Sample Response: See Appendix
};


/**
 * Retrieve archived version of a consumer’s view of the report
 *
 * @param req
 * @param res
 * @param next
 */
exports.retrieveArchivedConsumersReport = function (req, res, next) {

//    URL: /ECP2P/api/report/archive
//
//    Method: POST
//
//    Sample Request:
//
//        –i -k -H "Accept: application/json" -u username:password "https://stg1-
//
//    ss6.experian.com/ECP2P/api/report/archive -d
//
//    'consumerToken=MWNiNjZlM2MtNzA4My00ZDA3LWI3ODMtZjdiZjg2OWM2YWQy&transactionId=86' -
//
//    H "Accept: application/json" -X POST
//
//    Parameters:
//
//        consumerToken
//
//    transactionId
//
//    Response Fields:
//
//        CreditReportJSON
//
//    Sample Response: See Appendix
};
