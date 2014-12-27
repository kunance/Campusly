/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PROPERTY_LIKES', { 
    propertyId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER(11),
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
