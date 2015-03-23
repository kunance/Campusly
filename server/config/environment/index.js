'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: process.env.SESSION_SECRET ||  'base-code-sql-secret',
    mailConfirmation : process.env.MAIL_CONFIRMATION_SECRET || 'mailConfirmation',
    passwordReset: process.env.PASSWORD_RESET_SECRET || 'passwordReset'
  },

  mail: {
    sendGridOptions : {
      auth: {
        api_user: 'CampuslyMailer',
        api_key: 'ApiKey'
      }
    },
    from_email: 'info@campusly.org',
    from_name: 'Campusly'
  },

  // List of user roles
  userRoles: ['owner', 'tenant', 'admin'],

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

  facebook: {
    clientID:     process.env.FACEBOOK_ID || '1482591365325802',
    clientSecret: process.env.FACEBOOK_SECRET || '693245cb35eb21919c4ec1c6d567c0c6',
    callbackURL: (process.env.DOMAIN || '') + '/auth/facebook/callback'
  },

  twitter: {
    clientID:     process.env.TWITTER_ID || 'id',
    clientSecret: process.env.TWITTER_SECRET || 'secret',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/twitter/callback'
  },

  google: {
    clientID:     process.env.GOOGLE_ID || '1006272314768-br0o0pnvvrb5etsbcvv183t5afdegeni.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_SECRET || 'bXICpUtdjsE0y9n3N9-HRCjk',
    callbackURL: (process.env.DOMAIN || '') + '/auth/google/callback'
  },

  linkedin: {
    consumerKey:     process.env.LINKEDIN_ID || 'empty',
    consumerSecret:  process.env.LINKEDIN_SECRET || 'empty',
    callbackURL:    (process.env.DOMAIN || '') + '/auth/linkedin/callback'
  },
  aws_s3: {
    key: 'AKIAJ5YZIB24A4YS4GBA',
    secret: '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',
    bucket: 'rented.images',
    region: 'us-west-2'
  },
  prerender:{
    Token: 'HpLWLFxfanDOCk8Ie2rO'
  },
  mandrill:{
    APIkey: 'EXFHZXK5FFxIfxkDxknItQ'
  }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});
