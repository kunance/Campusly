/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('RENTALAPPLICANT', { 
    userId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    rentalAppId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    shareCredit: {
      type: 'BIT(1)',
      allowNull: true,
    }
  });
};
