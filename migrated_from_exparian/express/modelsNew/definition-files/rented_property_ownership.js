/*jslint node: true */
"use strict";
/*------------------------------------------------------------------------------------

DO NOT EDIT THIS FILE !!! It is generated automatically and will be overwritten.

To modify this model:
1. Create 'property_ownership-custom.js' file in this directory.
2. Copy the code below and paste it into 'property_ownership-custom.js'.
3. Use utility methods to easily access orm properties.

"use strict";
var orm     = require('model\index.js'),
    model   = require('./property_ownership.js'),
    util    = require('./utils.js')(model),
    Seq     = orm.Sequelize();

module.exports = model;

// Some utility methods:
util.getRelation("relatedPropertyFK").onDelete = 'CASCADE'; 
util.getAttribute("startDate").comment = 'This is the comment'; 

------------------------------------------------------------------------------------*/
var orm = require('../index.js'),
    Seq = orm.Sequelize();
module.exports = {
    modelName: "rented.propertyOwnership",
    options: {
        tableName: "property_ownership",
        schema: "rented",
        timestamps: false
    },
    attributes: {
        "startDate": {
            type: Seq.DATE,
            field: "startDate",
            allowNull: false
        },
        "endDate": {
            type: Seq.DATE,
            field: "endDate",
            allowNull: false
        },
        "propertyFK": {
            type: Seq.BIGINT,
            field: "propertyFK",
            allowNull: false,
            references: "property",
            referencesKey: "propertyFK"
        },
        "id": {
            type: Seq.BIGINT,
            field: "id",
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: "property_ownership_pkey"
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
            as: "relatedPropertyFK",
            foreignKey: "propertyFK",
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION"
        }
    }]
};