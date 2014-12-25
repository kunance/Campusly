/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('INVITEES', { 
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    invitorId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    facebook: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    twitter: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    googlePlus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    linkedIn: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
};
