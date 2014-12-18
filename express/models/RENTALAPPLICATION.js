/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('RENTALAPPLICATION', { 
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    propertyId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    preferredLeaseLength: {
      type: DataTypes.ENUM('WEAKLY','MONTHLY','1YR','2YR','3YR','4+YR'),
      allowNull: true,
    },
    preferredMoveIn: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    numOccupants: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    moveReason: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
};
