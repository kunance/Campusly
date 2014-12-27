"use strict";

module.exports = {
    env: "development",
    ip: "0.0.0.0",
//    mongo: {
//        uri: "mongodb://localhost/rented-dev"
//    },
    mysql: {
        connection: {
            host: "localhost",
            user: "renteddbadmin",
            password: "rentedrented",
            database: "Rented",
            charset: "utf8"
        }
        //connection: {
        //    host: "rentedv5.cyngrnmslnob.us-west-2.rds.amazonaws.com",  // localhost
        //    user: "john",
        //    password: "rentedrented",
        //    database: "Rented",
        //    charset: "utf8"
        //}
    },
    experian: {
        protocol: "https",
        port: 443,
        ip: "https://stg1-ss6.experian.com",
        paths: {
            getOwnReport: "/ECP2P/api/user",
            submitAuthAnswers: "/ECP2P/api/user/answers",
            getAuthStatus: "/ECP2P/api/auth/authstatus/",
            reAuthExistingToken: "/ECP2P/api/auth/",
            submitAnswersReAuthExistingToken: "/ECP2P/api/auth/answers",
            getConsumerCreditReport: "/ECP2P/api/report",
            shareCreditReport: "/ECP2P/api/share",
            getSharedCreditReport: "/ECP2P/api/share/get",
            getArchivedConsumerReport: "/ECP2P/api/report/archive"

        },
        auth: {
            rented: {
                username: "connect_rented",
                password: "cnct1014e"
            }
        }

    }
};
