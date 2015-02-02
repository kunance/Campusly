/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('apartment_complex_image', { 
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    complexId: {
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
