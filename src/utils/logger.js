'use strict';

const { createLogger, format, transports }       = require('winston');
const { combine, timestamp, label, prettyPrint } = format;
const moment                                     = require('moment');
const fs                                         = require('fs');

// Single globale variable
let winstonLogger;

const instantiate = function() {
  // Create the logs folder
  try {
    fs.mkdirSync('./logs');
  } catch (err) {
    // If the err code is not the fact the folder already exists
    if (err.code !== 'EEXIST') {
      console.error('[app] Could not create logs folder" ', {
        err: err
      });
      process.exit(1);
    }
  }

  const filename = moment().toISOString();

  return createLogger({
    format: combine(
      label({ label: 'label prepend' }),
      timestamp(),
      prettyPrint()
    ),
    transports: [
      new transports.Console(),
      new transports.File({ filename })
    ]
  });
}

module.exports = function(filename) {
  if (!winstonLogger) winstonLogger = instantiate();

  const logger = {
    error: function(text) {
        winstonLogger.error(filename + ': ' + text)
    },
    info: function(text) {
        winstonLogger.info(filename + ': ' + text)
    }
  }
  
  return logger;
}
