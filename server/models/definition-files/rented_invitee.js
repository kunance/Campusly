/*jslint node: true */
"use strict";
/*------------------------------------------------------------------------------------

DO NOT EDIT THIS FILE !!! It is generated automatically and will be overwritten.

To modify this model:
1. Create 'invitee-custom.js' file in this directory.
2. Copy the code below and paste it into 'invitee-custom.js'.
3. Use utility methods to easily access orm properties.

"use strict";
var orm     = require('model\index.js'),
    model   = require('./invitee.js'),
    util    = require('./utils.js')(model),
    Seq     = orm.Sequelize();

module.exports = model;

// Some utility methods:
util.getRelation("relatedInvitorId").onDelete = 'CASCADE'; 
util.getAttribute("id").comment = 'This is the comment'; 

------------------------------------------------------------------------------------*/
var orm = require('../index.js'),
    Seq = orm.Sequelize();
module.exports = {
    modelName: "rented.invitee",
    options: {
        tableName: "invitee",
        //schema: "rented",
        timestamps: false
    },
    attributes: {
        "id": {
            type: Seq.BIGINT,
            field: "id",
            primaryKey: true,
            allowNull: false,
            unique: "invitee_pkey"
        },
        "firstName": {
            type: Seq.STRING(45),
            field: "firstName",
            allowNull: false
        },
        "lastName": {
            type: Seq.STRING(45),
            field: "lastName",
            allowNull: false
        },
        "invitorId": {
            type: Seq.BIGINT,
            field: "invitorId",
            allowNull: false,
            references: "rented_user",
            referencesKey: "invitorId"
        },
        "email": {
            type: Seq.STRING(45),
            field: "email"
        },
        "phone": {
            type: Seq.INTEGER,
            field: "phone"
        },
        "facebook": {
            type: Seq.STRING(45),
            field: "facebook"
        },
        "twitter": {
            type: Seq.STRING(45),
            field: "twitter"
        },
        "googlePlus": {
            type: Seq.STRING(45),
            field: "googlePlus"
        },
        "linkedIn": {
            type: Seq.STRING(45),
            field: "linkedIn"
        },
        "viewProperty": {
            type: Seq.BOOLEAN,
            field: "viewProperty"
        },
        "viewPropertyId": {
            type: Seq.BIGINT,
            field: "viewPropertyId",
            references: "property",
            referencesKey: "viewPropertyId"
        },
        "createdAt": {
            type: Seq.DATE,
            field: "createdAt",
            allowNull: false
        },
        "updatedAt": {
            type: Seq.DATE,
            field: "updatedAt"
        },
        "deletedAt": {
            type: Seq.DATE,
            field: "deletedAt"
        }
    },
    relations: [{
        type: "belongsTo",
        model: "rented.rentedUser",
        schema: "rented",
        table: "rented_user",
        source: "generator",
        details: {
            as: "relatedInvitorId",
            foreignKey: "invitorId",
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION"
        }
    }, {
        type: "belongsTo",
        model: "rented.property",
        schema: "rented",
        table: "property",
        source: "generator",
        details: {
            as: "relatedViewPropertyId",
            foreignKey: "viewPropertyId",
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION"
        }
    }]
};