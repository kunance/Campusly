/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('RENTAL_APPLICANT', { 
    userId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    rentalAppId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    shareCredit: {
      type: DataTypes.BOOLEAN,
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
