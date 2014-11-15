"use strict";

module.exports = {
    env: "development",
    ip: "0.0.0.0",
//    mongo: {
//        uri: "mongodb://localhost/rented-dev"
//    },
    experian: {
        protocol: "https",
        port: 443,
        ip: "https://stg1-ss6.experian.com",
        paths: {
            getOwnReport: "ECP2P/api/user",
            submitAuthAnswers: "/ECP2P/api/user/answers",  // POST
            getAuthStatus: "/ECP2P/api/auth/authstatus/", // GET  /ECP2P/api/auth/authstatus/{tokenId}
            reAuthExistingToken: "/ECP2P/api/auth/",    //  GET /ECP2P/api/auth/{tokenId}
            submitAnswersReAuthExistingToken: "/ECP2P/api/auth/", // POST   /ECP2P/api/auth/{tokenId} service
            getCreditReport: "/ECP2P/api/report",   // POST
            shareCreditReport: "/ECP2P/api/share",  // POST
            getSharedCreditReport: "/ECP2P/api/share/get", // POST
            getArchivedConsumerReport: "/ECP2P/api/report/archive" // POST

        },
        auth: {
            rented: {
                username: "connect_rented",
                password: "cnct1014e"
            }
        }

    }
};
