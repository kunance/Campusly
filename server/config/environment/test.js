'use strict';

// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/basecodesql-test'
  },
  sequelize: {
    db: 'rentedTEST',
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
  }
};
