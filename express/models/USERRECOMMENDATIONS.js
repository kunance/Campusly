/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('USERRECOMMENDATIONS', { 
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    recommendedId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    recommendorId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    recommendedApproved: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
};
