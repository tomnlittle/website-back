/**
 * Configuration file with global constants
 * @module conf
 */

'use strict';

const fs                    = require('fs');

// External json file that stores keys which should not be in a 
// public git repository
const config_file = './config.json';
const CONFIG = JSON.parse(fs.readFileSync(config_file, 'utf8'));

module.exports = {
  
  // System Environment
  ENVIRONMENT            : process.env.NODE_ENV,

  // Logs folder
  LOGS_FOLDER            : './logs/',

  // Standard display date format => Only for displaying to the user
  DISPLAY_DATE_FORMAT    : 'Do MMMM YYYY - HH:mm:ss',

  GOOGLE: {
    GEOLOCK: 'au',

    LANGUAGE: 'en',

    // API key for google maps
    GOOGLE_MAPS_API_KEY: this.ENVIRONMENT === 'production' ? CONFIG.GOOGLE.LIVE.MAPS : CONFIG.GOOGLE.TEST.MAPS,
  },

  DEEP: {
    // API URL
    URL: 'https://api.deepai.org/api/deepdream', 

    //API for Deep AI
    DEEP_AI_KEY            : CONFIG.DEEP_AI.KEY,
  },

  // Default port 
  PORT                   : 3001
};