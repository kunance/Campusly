"use strict";

var path = require("path"),
    http = require("http"),
    https = require("https"),
    request = require("request"),
    config = require("../config/config"),
    logger =  require("../config/logger");

/**
 *
 * @param req  { creditReportRequestorInfo: { firstName: 'firstName' , lastName: 'lastName', currentAddress:
 *                  'currentAddress', currentCity: 'currentCity', currentState: 'currentState', currentZip:
 *                  'currentZip', [ssn: 'ssn']
 *              }
 * @returns {{valid: boolean}} or valid: false, errors: {}
 */
function _validateQueryRequest(req) {

    var crr = req.param("creditReportRequestorInfo");
//    console.log(crr);
    if(!crr || !crr.firstName || !crr.lastName || !crr.ssn || !crr.currentAddress || !crr.currentCity ||
        !crr.currentState || !crr.currentZip ) {
        return { valid: false, errors:[ "missing required fields" ] };
    }
    else {
        return { valid: true };
    }
}

/**
 *
 * @param req   { creditReportRequestorInfo: { firstName: 'firstName' , lastName: 'lastName', currentAddress:
 *                  'currentAddress', currentCity: 'currentCity', currentState: 'currentState', currentZip:
 *                  'currentZip', [ssn: 'ssn']
 *              }
 * @param res
 * @param next
 */
exports.getCreditReport = function (req, res, next) {

    var validQuery = _validateQueryRequest(req);

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

//exports.authenticateIndividual = function (req, res, next) {
//
//    |
//};
//
//
//exports.getCreditReportAsThirdParty = function (req, res, next) {
//
//    |
//};