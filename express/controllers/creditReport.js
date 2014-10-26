"use strict";

var path = require("path"),
    http = require("http"),
    https = require("https"),
    request = require("request"),
    config = require("../config/config"),
    logger =  require("../config/logger");

/**
 *
 * @param req  // TODO allow to be req.body.creditReportRequestorInfo OR from form data
 * @returns {{valid: boolean}} or valid: false, errors: {}
 */
function validateQueryRequest(req) {

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
 * @param req   body must contain {  //TODO  @see validateQueryRequest  req  }
 * @param res
 * @param next
 */
exports.getCreditReport = function (req, res, next) {

    var validQuery = validateQueryRequest(req);

    if (!validQuery.valid) {
        //TODO test this case
        res.json(validQuery); // JSON.parse(validQuery));
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
        }
        // console.log("httpResponse: ", httpResponse);
        //TODO verify httpResponse.responseCode is 200 ish
        console.log("body: ", body);
        //TODO remove escape characters from body before returning so pretty json
        res.json(body);

    });
};