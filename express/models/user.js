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
          }
      },
      {
        timestamps: false,
        tableName: 'USER'
      });
};
