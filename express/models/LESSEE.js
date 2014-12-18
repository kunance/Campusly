/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('LESSEE', { 
    leaseId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    }
  });
};
