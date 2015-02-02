/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('property', { 
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    streetNumeric: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
    },
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
      type: DataTypes.INTEGER(5),
      allowNull: false,
    },
    apt: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bldg: {
      type: DataTypes.STRING,
      allowNull: true,
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
      type: DataTypes.INTEGER(1),
      allowNull: true,
    },
    bathrooms: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
    },
    parkingSpots: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
    },
    livingAreaSqFt: {
      type: DataTypes.INTEGER(5),
      allowNull: true,
    },
    hoaFee: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
    },
    otherFee: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('AVAIL','PENDING','RENTED'),
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: 'CURRENT_TIMESTAMP'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  });
};
