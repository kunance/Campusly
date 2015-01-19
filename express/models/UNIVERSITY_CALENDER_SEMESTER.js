/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UNIVERSITY_CALENDER_SEMESTER', { 
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    universityId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fallSemesterStartDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fallSemesterEndDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    springSemesterStartDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    springSemesterEndDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    summerSemesterStartDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    summerSemesterEndDate: {
      type: DataTypes.DATE,
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
