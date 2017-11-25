'use strict';

const fs = require('fs');

// External json file that stores keys which should not be in a 
// public git repository
const config_file = './config.json';

const CONFIG = JSON.parse(fs.readFileSync(config_file, 'utf8'));

module.exports = {
  
  ENVIRONMENT            : process.env.NODE_ENV,

  // Logs folder
  LOGS_FOLDER            : './logs/',

  // API key for flickr
  FLICKR_API_KEY         : CONFIG.FLICKR_API_KEY,
}