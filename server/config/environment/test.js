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
    username:'postgres',
    password:'postgres',
    port:5432,
    options: {
      logging: false,
      dialect:'postgres',
      "protocol": "postgres",
      host:'localhost',
      define: {
        timestamps: false
      }
    }
  }
};
