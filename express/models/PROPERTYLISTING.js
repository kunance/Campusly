/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PROPERTYLISTING', { 
    propertyId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    monthlyPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    securityDeposit: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '0'
    },
    petDeposit: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: '0'
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
    leaseLength: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
    },
    leaseLengthUnit: {
      type: DataTypes.ENUM('DAY','WEEK','MONTH','YEAR'),
      allowNull: false,
    },
    contactPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
};
