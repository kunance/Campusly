/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('lease', { 
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    propertyId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    approved: {
      type: DataTypes.BOOLEAN,
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
      type: DataTypes.FLOAT(5,2),
      allowNull: false,
    },
    paymentInterval: {
      type: DataTypes.ENUM('WEEKLY','MONTHLY','YEARLY'),
      allowNull: false,
    },
    securityDeposit: {
      type: DataTypes.FLOAT(5,2),
      allowNull: true,
    },
    petDeposit: {
      type: DataTypes.FLOAT(4,2),
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
