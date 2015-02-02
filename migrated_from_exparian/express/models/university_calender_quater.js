/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('university_calender_quater', { 
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    universityId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
    },
    fallQuaterStartDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fallQuaterEndDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    winterQuaterStartDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    winterQuaterEndDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    springQuaterStartDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    springQuaterEndDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    summerQuaterStartDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    summerQuaterEndDate: {
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
