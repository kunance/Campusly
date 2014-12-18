/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PROPERTYOWNERSHIP', { 
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: 'CURRENT_TIMESTAMP'
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    propertyFK: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    }
  });
};
