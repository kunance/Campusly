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
    username:'ivan',
    password:'rentedrented',
    options: {
      logging: false,
      dialect:'mysql',
      host:'rented.cyngrnmslnob.us-west-2.rds.amazonaws.com',
      define: {
        timestamps: false
      }
    }
  },

  seedDB: false
};
