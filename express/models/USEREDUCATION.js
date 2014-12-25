/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('USEREDUCATION', { 
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    educationCenterName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('UNIVERSITY','TRADE','MILITARY'),
      allowNull: true,
      defaultValue: 'university'
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    graduation: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    graduationDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    major: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    degreeType: {
      type: DataTypes.ENUM('UNDERGRADUATE','GRADUATE','DOCTORATE','POST-DOCTORATE'),
      allowNull: true,
    }
  });
};
