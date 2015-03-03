'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/basecodesql-dev'
  },
  sequelize: {
    db: 'Rented',
    username:'postgres',
    password:'root',
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
  },
  seedDB: false
};
