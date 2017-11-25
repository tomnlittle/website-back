'use strict';

const { createLogger, format, transports }       = require('winston');
const { combine, timestamp, label, prettyPrint } = format;
const moment                                     = require('moment');
const fs                                         = require('fs');
const conf                                       = require('../conf');

// Single globale variable
let winstonLogger;

/**
 * Instantiates the winston logger and initialises the logs folder 
 */
const instantiate = function() {
  // Create the logs folder
  try {
    fs.mkdirSync(conf.LOGS_FOLDER);
  } catch (err) {
    // If the err code is not the fact the folder already exists
    if (err.code !== 'EEXIST') {
      console.error('[app] Could not create logs folder" ', {
        err: err
      });
      process.exit(1);
    }
  }

  const filename = conf.LOGS_FOLDER + moment().toISOString();

  return createLogger({
    transports: [
      new transports.Console(),
      new transports.File({ filename })
    ]
  });
}
/**
 * Returns the error object, so we always print the full stack of the error
 * @param  {} err - Error Object
 */
const prepareError = function(err) {
  return {
    err: JSON.stringify(err),
    message: err.message,
    stack: err.stack
  };
}

/**
 * This is the main function called
 * @param  {} msg - Any string that needs be printed
 * @param  {} object  - Error object
 * @param  {} privateMode - Whether the log should be written to disk or not 
 */
const log = function(msg, object, level, privateMode = false) {
  if (!winstonLogger) winstonLogger = instantiate();
  const error = prepareError(object);
  return winstonLogger.log({
    private: privateMode,
    level: level,
    message: msg, 
    err: error
  });
}

/**
 * logs info 
 * @param  {} msg - Any string that needs be printed
 * @param  {} object  - Error object
 * @param  {} privateMode - Whether the log should be written to disk or not 
 */
const info = function(msg, errorObject, privateMode) {
  return log(msg, errorObject, 'info');
}

/**
 * Logs errors
 * This is the main function called
 * @param  {} msg - Any string that needs be printed
 * @param  {} object  - Error object
 * @param  {} privateMode - Whether the log should be written to disk or not 
 */
const error = function(msg, errorObject) {
  return log(msg, errorObject, 'error');
}

module.exports = {
  log, 
  error
}

