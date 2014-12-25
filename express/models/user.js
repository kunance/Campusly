/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('USER', { 
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middlename: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: 'CURRENT_TIMESTAMP'
    },
    twitter: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    facebook: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    googleplus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    linkedin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    experianIdToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    creditCheckToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    runIdentityCheck: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    shareCreditReport: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    identityDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    creditReportDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    realtorLicenseState: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    DRE: {
      type: DataTypes.INTEGER(8),
      allowNull: true,
    }
  });
};
