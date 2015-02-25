/*jslint node: true */
"use strict";
/*------------------------------------------------------------------------------------

DO NOT EDIT THIS FILE !!! It is generated automatically and will be overwritten.

To modify this model:
1. Create 'property-custom.js' file in this directory.
2. Copy the code below and paste it into 'property-custom.js'.
3. Use utility methods to easily access orm properties.

"use strict";
var orm     = require('models/index.js'),
    model   = require('./property.js'),
    util    = require('./utils.js')(model),
    Seq     = orm.Sequelize();

module.exports = model;

// Some utility methods:
util.getRelation("leasePropertyidFkeys").onDelete = 'CASCADE'; 
util.getAttribute("id").comment = 'This is the comment'; 

------------------------------------------------------------------------------------*/
var orm = require('../index.js'),
    Seq = orm.Sequelize();
module.exports = {
    modelName: "rented.property",
    options: {
        tableName: "property",
        schema: "Rented",
        timestamps: false
    },
    attributes: {
        "id": {
            type: Seq.INTEGER,
            field: "id",
            allowNull: false,
            unique: "property_pkey"
        },
        "streetnumeric": {
            type: Seq.INTEGER,
            field: "streetnumeric",
            allowNull: false
        },
        "streetaddress": {
            type: Seq.STRING(255),
            field: "streetaddress",
            allowNull: false
        },
        "city": {
            type: Seq.STRING(30),
            field: "city",
            allowNull: false
        },
        "state": {
            type: Seq.STRING(2),
            field: "state",
            allowNull: false
        },
        "zip": {
            type: Seq.INTEGER,
            field: "zip",
            allowNull: false
        },
        "apt": {
            type: Seq.STRING(6),
            field: "apt"
        },
        "bldg": {
            type: Seq.STRING(10),
            field: "bldg"
        },
        "latitude": {
            type: Seq.DECIMAL(10, 8),
            field: "latitude"
        },
        "longitude": {
            type: Seq.DECIMAL(11, 8),
            field: "longitude"
        },
        "type": {
            type: Seq.STRING(250),
            field: "type"
        },
        "description": {
            type: Seq.STRING(255),
            field: "description"
        },
        "bedrooms": {
            type: Seq.INTEGER,
            field: "bedrooms"
        },
        "bathrooms": {
            type: Seq.INTEGER,
            field: "bathrooms"
        },
        "parkingspots": {
            type: Seq.INTEGER,
            field: "parkingspots"
        },
        "livingareasqft": {
            type: Seq.INTEGER,
            field: "livingareasqft"
        },
        "hoafee": {
            type: Seq.INTEGER,
            field: "hoafee"
        },
        "otherfee": {
            type: Seq.INTEGER,
            field: "otherfee"
        },
        "status": {
            type: Seq.STRING(250),
            field: "status"
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
        type: "hasMany",
        model: "rented.lease",
        schema: "Rented",
        table: "lease",
        source: "generator",
        details: {
            as: "leasePropertyidFkeys",
            foreignKey: "propertyid",
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION"
        }
    }, {
        type: "hasMany",
        model: "rented.propertyImages",
        schema: "Rented",
        table: "property_images",
        source: "generator",
        details: {
            as: "imagesPropertyidFkeys",
            foreignKey: "propertyid",
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION"
        }
    }, {
        type: "hasMany",
        model: "rented.propertyLeaseDefaults",
        schema: "Rented",
        table: "property_lease_defaults",
        source: "generator",
        details: {
            as: "leaseDefaultsPropertyidFkeys",
            foreignKey: "propertyid",
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION"
        }
    }, {
        type: "hasMany",
        model: "rented.propertyLikes",
        schema: "Rented",
        table: "property_likes",
        source: "generator",
        details: {
            as: "likesPropertyidFkeys",
            foreignKey: "propertyid",
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION"
        }
    }, {
        type: "hasMany",
        model: "rented.propertyListing",
        schema: "Rented",
        table: "property_listing",
        source: "generator",
        details: {
            as: "listingPropertyidFkeys",
            foreignKey: "propertyid",
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION"
        }
    }, {
        type: "hasMany",
        model: "rented.propertyOwnership",
        schema: "Rented",
        table: "property_ownership",
        source: "generator",
        details: {
            as: "ownershipPropertyfkFkeys",
            foreignKey: "propertyfk",
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION"
        }
    }, {
        type: "hasMany",
        model: "rented.rentalApplication",
        schema: "Rented",
        table: "rental_application",
        source: "generator",
        details: {
            as: "rentalApplicationPropertyidFkeys",
            foreignKey: "propertyid",
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION"
        }
    }, {
        type: "hasMany",
        model: "rented.roomListing",
        schema: "Rented",
        table: "room_listing",
        source: "generator",
        details: {
            as: "roomListingPropertyidFkeys",
            foreignKey: "propertyid",
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION"
        }
    }, {
        type: "belongsToMany",
        model: "rented.propertyListing",
        schema: "Rented",
        table: "property_listing",
        source: "generator",
        details: {
            as: "relatedImagesPropertyidFkeyListingids",
            foreignKey: "propertyid",
            otherKey: "listingid",
            through: "property_images",
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION"
        }
    }, {
        type: "belongsToMany",
        model: "rented.rentedUser",
        schema: "Rented",
        table: "rented_user",
        source: "generator",
        details: {
            as: "relatedLeaseDefaultsPropertyidFkeyOwnerids",
            foreignKey: "propertyid",
            otherKey: "ownerid",
            through: "property_lease_defaults",
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION"
        }
    }, {
        type: "belongsToMany",
        model: "rented.rentedUser",
        schema: "Rented",
        table: "rented_user",
        source: "generator",
        details: {
            as: "relatedLikesPropertyidFkeyUserids",
            foreignKey: "propertyid",
            otherKey: "userid",
            through: "property_likes",
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION"
        }
    }, {
        type: "belongsToMany",
        model: "rented.rentedUser",
        schema: "Rented",
        table: "rented_user",
        source: "generator",
        details: {
            as: "relatedRoomListingPropertyidFkeyCreatorids",
            foreignKey: "propertyid",
            otherKey: "creatorid",
            through: "room_listing",
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION"
        }
    }]
};