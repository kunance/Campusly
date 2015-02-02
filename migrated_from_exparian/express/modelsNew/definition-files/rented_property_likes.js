/*jslint node: true */
"use strict";
/*------------------------------------------------------------------------------------

DO NOT EDIT THIS FILE !!! It is generated automatically and will be overwritten.

To modify this model:
1. Create 'property_likes-custom.js' file in this directory.
2. Copy the code below and paste it into 'property_likes-custom.js'.
3. Use utility methods to easily access orm properties.

"use strict";
var orm     = require('model\index.js'),
    model   = require('./property_likes.js'),
    util    = require('./utils.js')(model),
    Seq     = orm.Sequelize();

module.exports = model;

// Some utility methods:
util.getRelation("relatedPropertyId").onDelete = 'CASCADE'; 
util.getAttribute("propertyId").comment = 'This is the comment'; 

------------------------------------------------------------------------------------*/
var orm = require('../index.js'),
    Seq = orm.Sequelize();
module.exports = {
    modelName: "rented.propertyLikes",
    options: {
        tableName: "property_likes",
        schema: "rented",
        timestamps: false
    },
    attributes: {
        "propertyId": {
            type: Seq.BIGINT,
            field: "propertyId",
            allowNull: false,
            references: "property",
            referencesKey: "propertyId"
        },
        "userId": {
            type: Seq.BIGINT,
            field: "userId",
            allowNull: false,
            references: "rented_user",
            referencesKey: "userId"
        },
        "id": {
            type: Seq.BIGINT,
            field: "id",
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: "property_likes_pkey"
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
        model: "rented.property",
        schema: "rented",
        table: "property",
        source: "generator",
        details: {
            as: "relatedPropertyId",
            foreignKey: "propertyId",
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