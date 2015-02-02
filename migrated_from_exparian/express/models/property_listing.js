/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('property_listing', { 
    propertyId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    monthlyPrice: {
      type: DataTypes.FLOAT(5,2),
      allowNull: false,
    },
    securityDeposit: {
      type: DataTypes.FLOAT(5,2),
      allowNull: true,
      defaultValue: '0.00'
    },
    petDeposit: {
      type: DataTypes.FLOAT(4,2),
      allowNull: true,
      defaultValue: '0.00'
    },
    availableMoveIn: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: 'CURRENT_TIMESTAMP'
    },
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    leaseEndDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    leaseLength: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
    },
    leaseLengthUnit: {
      type: DataTypes.ENUM('DAY','WEEK','MONTH','YEAR'),
      allowNull: false,
    },
    leaseType: {
      type: DataTypes.ENUM('SUB-LEASE','MONTH-TO-MONTH','REGULAR'),
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM('NO PREFERENCE','MALE PREFERRED','FEMALE PREFERRED','MALE ONLY','FEMALE ONLY'),
      allowNull: false,
      defaultValue: 'no preference'
    },
    totalUtilityCost: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
    },
    roomType: {
      type: DataTypes.ENUM('SINGLE','DOUBLE','TRIPLE','LOFT','LIVING ROOM'),
      allowNull: false,
    },
    sharedBathroom: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    numRoomates: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
    },
    furnished: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    parkingAvailable: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    smokingAllowed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('AVAILABLE','RENTAL PENDING','RENTED'),
      allowNull: true,
      defaultValue: 'available'
    },
    contactPhone: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
    },
    contactEmail: {
      type: DataTypes.STRING,
      allowNull: false,
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
