'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/basecodesql-dev'
  },
  sequelize: {
    db: 'rented',
    username:'root',
    password:'root',
    options: {
      logging: false,
      dialect:'mysql',
      host:'localhost',
      define: {
        timestamps: false
      }
    }
  },
  seedDB: false
};
