"use strict";

var path = require("path"),
    http = require("http"),
    https = require("https"),
    request = require("request"),
    config = require("../config/config"),
    logger =  require("../config/logger"),
    experianService = require("../services/experianService");


//TODO  experianService has all the service calls so slightly modify the input, output params of the methods
//      to support the Use Cases from the front end and Rented perspective, for example user should be passed in
//      so that the user can be pulled from the database to retrieve items such as user token or transaction id or
//      share id from the credit report table for a specific user

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

    return experianService.getCreditReport(req, res);
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

    return experianService.authAndCreateUser(req, res);
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

    return experianService.submitAuthenticateAnswers(req, res);
};



/**
 * Check authentication status for existing user with their token
 *
 * @param req  req.body = { userToken: string }
 * @param res  success { "success": true, "authenticated": true }
 *             failure { success: false, errorType: 'system', error: object | string};  TODO investigate errors more
 */
exports.getAuthStatus = function (req, res, next) {

    return experianService.getAuthStatus(req, res);
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

    return experianService.reAuthExistingToken(req, res);
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

    return experianService.submitAnswersReauthExistingToken(req, res);
};


/**
 * Get the Connect credit report and Vantagescore. This request is for a credit report that is shown to the
   consumer specifically. The report can then be shared by referencing the transactionId in a following
   service.

 * @param req  req.body: { productId: integer, consumerToken: "token", purposeType: integer }
 *      Product ID  Description
 *       1          Credit Report – Consumer View + 30 day share
 *       9          Credit Report – Consumer View + Single Share
 *
 *       Purpose Type  not defined in Connect API guide  // TODO get allowed values and meanings
 * @param success { success: true,  transactionId: integer, creditProfile: { @see getCreditReportResponse.json } };
 *             failure { success: false, error: object | string};  TODO investigate errors more
 */
exports.getConsumerCreditReport = function (req, res, next) {

    return experianService.getConsumerCreditReport(req, res);
};


/**
 *  Share a consumer credit report previously purchased that qualifies for sharing.
 *
 * @param req   req.body: { consumerToken: "token", endUserToken: "endUserToken", purposeType: integer,
 *                          transactionId: "id" }    // txn id is returned from retrieving a credit report
 * @param res success { success: true, shareId: "id" };
 *             failure { success: false, error: object | string};  TODO investigate errors more
 */
exports.shareConsumerCreditReport = function (req, res, next) {

    return experianService.shareConsumerCreditReport(req, res);
};


/**
 * Retrieve a copy of the shared report. This can be called multiple times to retrieve previously pulled
   reports. This retrieves an archived copy of the report and is not considered a new transaction.
 *
 * @param req   req.body: { shareId: "share id", endUserToken: "endUserToken" }
 * @param res   success { success: true, creditProfile: { @see getCreditReportResponse.json } };
 *              failure { success: false, error: object | string};  TODO investigate errors more
 */
exports.retrieveSharedConsumerCreditReportForEndUser = function (req, res, next) {

    return experianService.retrieveSharedConsumerCreditReportForEndUser(req, res);
};


/**
 * Retrieve archived version of a consumer’s view of the report
 *
 * @param req  req.body: { transactionId: "transaction id", consumerToken: "token" }
 * @param res   success { success: true, creditProfile: { @see getCreditReportResponse.json } };
 *              failure { success: false, error: object | string};  TODO investigate errors more
 */
exports.retrieveArchivedConsumersReport = function (req, res, next) {

    return experianService.retrieveArchivedConsumersReport(req, res);
};
