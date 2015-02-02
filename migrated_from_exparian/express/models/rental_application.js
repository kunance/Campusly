/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rental_application', { 
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    propertyId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    preferredLeaseLength: {
      type: DataTypes.INTEGER(3),
      allowNull: true,
    },
    preferredMoveIn: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    numOccupants: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      defaultValue: '1'
    },
    moveReason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    preferredLeaseLengthUnit: {
      type: DataTypes.ENUM('DAY','WEEK','MONTH','YEAR'),
      allowNull: true,
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
