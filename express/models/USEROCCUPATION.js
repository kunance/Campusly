/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('USEROCCUPATION', { 
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    presentlyEmployeed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    userId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    }
  });
};
