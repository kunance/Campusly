/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PROPERTYIMAGES', { 
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    listingId: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
    },
    propertyId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
};
