/*jslint node: true */
"use strict";
/*------------------------------------------------------------------------------------

DO NOT EDIT THIS FILE !!! It is generated automatically and will be overwritten.

To modify this model:
1. Create 'user_education-custom.js' file in this directory.
2. Copy the code below and paste it into 'user_education-custom.js'.
3. Use utility methods to easily access orm properties.

"use strict";
var orm     = require('model\index.js'),
    model   = require('./user_education.js'),
    util    = require('./utils.js')(model),
    Seq     = orm.Sequelize();

module.exports = model;

// Some utility methods:
util.getRelation("relatedUserId").onDelete = 'CASCADE'; 
util.getAttribute("id").comment = 'This is the comment'; 

------------------------------------------------------------------------------------*/
var orm = require('../index.js'),
    Seq = orm.Sequelize();
module.exports = {
    modelName: "rented.userEducation",
    options: {
        tableName: "user_education",
        //schema: "rented",
        timestamps: false
    },
    attributes: {
        "id": {
            type: Seq.BIGINT,
            field: "id",
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: "user_education_pkey"
        },
        "userId": {
            type: Seq.BIGINT,
            field: "userId",
            allowNull: false,
            references: "rented_user",
            referencesKey: "userId"
        },
        "educationCenterName": {
            type: Seq.STRING(45),
            field: "educationCenterName",
            allowNull: false
        },
        "type": {
            type: Seq.CHAR(255),
            field: "type"
        },
        "startDate": {
            type: Seq.DATE,
            field: "startDate",
            allowNull: false
        },
        "endDate": {
            type: Seq.DATE,
            field: "endDate"
        },
        "graduation": {
            type: Seq.BOOLEAN,
            field: "graduation",
            allowNull: false
        },
        "graduationDate": {
            type: Seq.DATE,
            field: "graduationDate"
        },
        "major": {
            type: Seq.STRING(45),
            field: "major"
        },
        "degreeType": {
            type: Seq.CHAR(255),
            field: "degreeType"
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
            as: "relatedUserId",
            foreignKey: "userId",
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION"
        }
    }]
};