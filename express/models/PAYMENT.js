/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PAYMENT', { 
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    payerId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    payeeId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    dollarAmount: {
      type: DataTypes.FLOAT(5,2),
      allowNull: true,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rentPayment: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: '0'
    },
    creditCheckPayment: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: '0'
    },
    paymentForm: {
      type: DataTypes.ENUM('CREDIT CARD','ACH','CASH'),
      allowNull: true,
    },
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: 'CURRENT_TIMESTAMP'
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
