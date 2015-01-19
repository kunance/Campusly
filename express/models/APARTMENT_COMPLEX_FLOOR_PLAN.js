/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('APARTMENT_COMPLEX_FLOOR_PLAN', { 
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    complexId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    bedrooms: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
    },
    bathrooms: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
    },
    parking: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    living_area: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
    },
    washer_dryer: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
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
