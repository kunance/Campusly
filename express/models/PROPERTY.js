/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PROPERTY', { 
    streetAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('APT','SFH','DUPLEX','LAND','TOWNHOUSE'),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bedrooms: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    bathrooms: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    parkingSpots: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    livingAreaSqFt: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    hoaFee: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    otherFee: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('AVAIL','PENDING','RENTED'),
      allowNull: true,
    }
  });
};
