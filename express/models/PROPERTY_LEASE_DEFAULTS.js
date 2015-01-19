/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PROPERTY_LEASE_DEFAULTS', { 
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    propertyId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    qtyDogsAllowed: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
      defaultValue: '0'
    },
    qtyCatsAllowed: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
      defaultValue: '0'
    },
    qtyOtherAllowed: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
      defaultValue: '0'
    },
    animalSizeLimitLbs: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      defaultValue: '25'
    },
    fishTankAllowed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    preferredLeaseLength: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
    },
    preferredLeaseUnit: {
      type: DataTypes.ENUM('DAY','WEEK','MONTH','YEAR'),
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
