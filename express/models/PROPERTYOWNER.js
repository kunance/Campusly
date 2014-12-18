/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PROPERTYOWNER', { 
    propertyOwnershipId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    }
  });
};
