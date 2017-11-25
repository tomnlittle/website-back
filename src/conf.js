const fs = require('fs');

function define(name, value) {
  Object.defineProperty(exports, name, {
    value: value,
    enumerable: true
  });
}

// External json file that stores keys which should not be in a 
// public git repository
define('CONFIG_JSON', './config.json');

const CONFIG = JSON.parse(fs.readFileSync(this.CONFIG_JSON, 'utf8'));

define('FLICKR_API_KEY', CONFIG.FLICKR_API_KEY);