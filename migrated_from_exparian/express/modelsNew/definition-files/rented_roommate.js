/*jslint node: true */
"use strict";
/*------------------------------------------------------------------------------------

DO NOT EDIT THIS FILE !!! It is generated automatically and will be overwritten.

To modify this model:
1. Create 'roommate-custom.js' file in this directory.
2. Copy the code below and paste it into 'roommate-custom.js'.
3. Use utility methods to easily access orm properties.

"use strict";
var orm     = require('model\index.js'),
    model   = require('./roommate.js'),
    util    = require('./utils.js')(model),
    Seq     = orm.Sequelize();

module.exports = model;

// Some utility methods:
util.getRelation("relatedRoommateId").onDelete = 'CASCADE'; 
util.getAttribute("id").comment = 'This is the comment'; 

------------------------------------------------------------------------------------*/
var orm = require('../index.js'),
    Seq = orm.Sequelize();
module.exports = {
    modelName: "rented.roommate",
    options: {
        tableName: "roommate",
        schema: "rented",
        timestamps: false
    },
    attributes: {
        "id": {
            type: Seq.BIGINT,
            field: "id",
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: "roommate_pkey"
        },
        "userId": {
            type: Seq.BIGINT,
            field: "userId",
            allowNull: false,
            references: "rented_user",
            referencesKey: "userId"
        },
        "roommateId": {
            type: Seq.BIGINT,
            field: "roommateId",
            allowNull: false,
            references: "rented_user",
            referencesKey: "roommateId"
        },
        "fromDate": {
            type: Seq.DATE,
            field: "fromDate",
            allowNull: false
        },
        "toDate": {
            type: Seq.DATE,
            field: "toDate"
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
            as: "relatedRoommateId",
            foreignKey: "roommateId",
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION"
        }
    }, {
        type: "belongsTo",
        model: "rented.rentedUser",
        schema: "rented",
        table: "rented_user",
        source: "generator",
        details: {
            as: "relatedUserId",
            foreignKey: "userId",
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION"
        }
    }]
};