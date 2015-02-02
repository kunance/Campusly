/*jslint node: true */
"use strict";
/*------------------------------------------------------------------------------------

DO NOT EDIT THIS FILE !!! It is generated automatically and will be overwritten.

To modify this model:
1. Create 'apartment_complex_transportation-custom.js' file in this directory.
2. Copy the code below and paste it into 'apartment_complex_transportation-custom.js'.
3. Use utility methods to easily access orm properties.

"use strict";
var orm     = require('model\index.js'),
    model   = require('./apartment_complex_transportation.js'),
    util    = require('./utils.js')(model),
    Seq     = orm.Sequelize();

module.exports = model;

// Some utility methods:
util.getRelation("relatedComplexId").onDelete = 'CASCADE'; 
util.getAttribute("id").comment = 'This is the comment'; 

------------------------------------------------------------------------------------*/
var orm = require('../index.js'),
    Seq = orm.Sequelize();
module.exports = {
    modelName: "rented.apartmentComplexTransportation",
    options: {
        tableName: "apartment_complex_transportation",
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
            unique: "apartment_complex_transportation_pkey"
        },
        "complexId": {
            type: Seq.BIGINT,
            field: "complexId",
            allowNull: false,
            references: "apartment_complex",
            referencesKey: "complexId"
        },
        "shuttleRoute": {
            type: Seq.STRING(255),
            field: "shuttleRoute",
            allowNull: false
        },
        "busLine": {
            type: Seq.BIGINT,
            field: "busLine",
            allowNull: false
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
        model: "rented.apartmentComplex",
        schema: "rented",
        table: "apartment_complex",
        source: "generator",
        details: {
            as: "relatedComplexId",
            foreignKey: "complexId",
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION"
        }
    }]
};