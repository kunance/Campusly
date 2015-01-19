/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PROPERTY_IMAGES', { 
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    listingId: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
    },
    propertyId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
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
