/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('LEASE', { 
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    propertyId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    approved: {
      type: 'BIT(1)',
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    paymentAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    paymentInterval: {
      type: DataTypes.ENUM('WEEKLY','MONTHLY','YEARLY'),
      allowNull: false,
    },
    securityDeposit: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    petDeposit: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    payee: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    built: {
      type: DataTypes.DATE,
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
