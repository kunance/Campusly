/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PETS', { 
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('CAT','DOG','BIRD','FISH','OTHER'),
      allowNull: false,
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weightLbs: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
    }
  });
};
