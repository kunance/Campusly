/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('LOOKING', { 
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    maxMonthlyRent: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
    },
    utilitiesIncluded: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    area: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    distanceToUniv: {
      type: DataTypes.FLOAT(3,2),
      allowNull: true,
    },
    moveInDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: 'CURRENT_TIMESTAMP'
    },
    lengthOfStay: {
      type: DataTypes.INTEGER(3),
      allowNull: true,
    },
    longTermIntention: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    openToFullYearLeaseNewRoomates: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    roomType: {
      type: DataTypes.ENUM('SINGLE','DOUBLE','TRIPLE','LOFT','LIVING ROOM'),
      allowNull: true,
    },
    sharedBathroom: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    gender: {
      type: DataTypes.ENUM('NO PREFERENCE','MALE PREFERRED','FEMALE PREFERRED','MALE ONLY','FEMALE ONLY'),
      allowNull: false,
      defaultValue: 'no preference'
    },
    numRoommates: {
      type: DataTypes.INTEGER(2),
      allowNull: true,
    },
    furnished: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    busRouteRequired: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    parkingNeeded: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    smokingAllowed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    petsAllowed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    coupleAllowed: {
      type: DataTypes.BOOLEAN,
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
