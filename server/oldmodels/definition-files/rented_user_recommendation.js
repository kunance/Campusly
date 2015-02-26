/*jslint node: true */
"use strict";
/*------------------------------------------------------------------------------------

DO NOT EDIT THIS FILE !!! It is generated automatically and will be overwritten.

To modify this model:
1. Create 'user_recommendation-custom.js' file in this directory.
2. Copy the code below and paste it into 'user_recommendation-custom.js'.
3. Use utility methods to easily access orm properties.

"use strict";
var orm     = require('model\index.js'),
    model   = require('./user_recommendation.js'),
    util    = require('./utils.js')(model),
    Seq     = orm.Sequelize();

module.exports = model;

// Some utility methods:
util.getRelation("relatedRecommendedId").onDelete = 'CASCADE';
util.getAttribute("id").comment = 'This is the comment';

------------------------------------------------------------------------------------*/
var orm = require('../index.js'),
    Seq = orm.Sequelize();
module.exports = {
    modelName: "rented.userRecommendation",
    options: {
        tableName: "user_recommendation",
        //schema: "rented",
        timestamps: true
    },
    attributes: {
        "id": {
            type: Seq.BIGINT,
            field: "id",
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: "user_recommendation_pkey"
        },
        "recommendedId": {
            type: Seq.BIGINT,
            field: "recommendedId",
            allowNull: false,
            references: "rented_user",
            referencesKey: "recommendedId"
        },
        "recommendorId": {
            type: Seq.BIGINT,
            field: "recommendorId",
            allowNull: false,
            references: "rented_user",
            referencesKey: "recommendorId"
        },
        "recommendedApproved": {
            type: Seq.BOOLEAN,
            field: "recommendedApproved",
            allowNull: false
        },
        "content": {
            type: Seq.STRING(255),
            field: "content"
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
            as: "relatedRecommendedId",
            foreignKey: "recommendedId",
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
            as: "relatedRecommendorId",
            foreignKey: "recommendorId",
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION"
        }
    }]
};
