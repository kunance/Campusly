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
            getOwnReport: "ECP2P/api/user"
        },
        auth: {
            rented: {
                username: "connect_rented",
                password: "cnct1014e"
            }
        }

    }
};
