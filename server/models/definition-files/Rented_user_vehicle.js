/*jslint node: true */
"use strict";
/*------------------------------------------------------------------------------------

DO NOT EDIT THIS FILE !!! It is generated automatically and will be overwritten.

To modify this model:
1. Create 'user_vehicle-custom.js' file in this directory.
2. Copy the code below and paste it into 'user_vehicle-custom.js'.
3. Use utility methods to easily access orm properties.

"use strict";
var orm     = require('models/index.js'),
    model   = require('./user_vehicle.js'),
    util    = require('./utils.js')(model),
    Seq     = orm.Sequelize();

module.exports = model;

// Some utility methods:
util.getRelation("relatedUserid").onDelete = 'CASCADE'; 
util.getAttribute("id").comment = 'This is the comment'; 

------------------------------------------------------------------------------------*/
var orm = require('../index.js'),
    Seq = orm.Sequelize();
module.exports = {
    modelName: "rented.userVehicle",
    options: {
        tableName: "user_vehicle",
        schema: "Rented",
        timestamps: false
    },
    attributes: {
        "id": {
            type: Seq.INTEGER,
            field: "id",
            allowNull: false,
            unique: "user_vehicle_pkey"
        },
        "year": {
            type: Seq.INTEGER,
            field: "year",
            allowNull: false
        },
        "make": {
            type: Seq.STRING(45),
            field: "make",
            allowNull: false
        },
        "model": {
            type: Seq.STRING(45),
            field: "model",
            allowNull: false
        },
        "licenseplate": {
            type: Seq.STRING(45),
            field: "licenseplate",
            allowNull: false
        },
        "color": {
            type: Seq.STRING(45),
            field: "color",
            allowNull: false
        },
        "userid": {
            type: Seq.INTEGER,
            field: "userid",
            references: "rented_user",
            referencesKey: "userid"
        },
        "createdat": {
            type: Seq.DATE,
            field: "createdat",
            allowNull: false
        },
        "updatedat": {
            type: Seq.DATE,
            field: "updatedat"
        },
        "deletedat": {
            type: Seq.DATE,
            field: "deletedat"
        }
    },
    relations: [{
        type: "belongsTo",
        model: "rented.rentedUser",
        schema: "Rented",
        table: "rented_user",
        source: "generator",
        details: {
            as: "relatedUserid",
            foreignKey: "userid",
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION"
        }
    }]
};