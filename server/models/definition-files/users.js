/*jslint node: true */
"use strict";
/*------------------------------------------------------------------------------------

DO NOT EDIT THIS FILE !!! It is generated automatically and will be overwritten.

To modify this model:
1. Create 'users-custom.js' file in this directory.
2. Copy the code below and paste it into 'users-custom.js'.
3. Use utility methods to easily access orm properties.

"use strict";
var orm     = require('models\index.js'),
    model   = require('./users.js'),
    util    = require('./utils.js')(model),
    Seq     = orm.Sequelize();

module.exports = model;

// Some utility methods:

util.getAttribute("id").comment = 'This is the comment';

------------------------------------------------------------------------------------*/
var orm = require('../index.js'),
    Seq = orm.Sequelize();
module.exports = {
    modelName: "users",
    options: {
        tableName: "users",
   //     schema: "rented",
        timestamps: false
    },
    attributes: {
        "id": {
            type: Seq.INTEGER,
            field: "id",
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: "users_pkey"
        },
        "name": {
            type: Seq.STRING(255),
            field: "name"
        },
        "email": {
            type: Seq.STRING(255),
            field: "email"
        },
        "username": {
            type: Seq.STRING(255),
            field: "username"
        },
        "hashedPassword": {
            type: Seq.STRING(255),
            field: "hashedPassword"
        },
        "provider": {
            type: Seq.STRING(255),
            field: "provider"
        },
        "salt": {
            type: Seq.STRING(255),
            field: "salt"
        },
        "facebookUserId": {
            type: Seq.INTEGER,
            field: "facebookUserId"
        },
        "twitterUserId": {
            type: Seq.INTEGER,
            field: "twitterUserId"
        },
        "twitterKey": {
            type: Seq.STRING(255),
            field: "twitterKey"
        },
        "twitterSecret": {
            type: Seq.STRING(255),
            field: "twitterSecret"
        },
        "github": {
            type: Seq.STRING(255),
            field: "github"
        },
        "openId": {
            type: Seq.STRING(255),
            field: "openId"
        },
        "createdAt": {
            type: Seq.DATE,
            field: "createdAt",
            allowNull: false
        },
        "updatedAt": {
            type: Seq.DATE,
            field: "updatedAt",
            allowNull: false
        }
    },
    relations: []
};
