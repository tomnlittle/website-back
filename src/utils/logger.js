'use strict';

const { createLogger, format, transports }       = require('winston');
const { combine, printf, colorize}               = format;
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

  const filename = conf.LOGS_FOLDER + moment().format(conf.DISPLAY_DATE_FORMAT);

  return createLogger({
    transports: [
      new transports.Console({ 
        format: format.combine(
          colorize(),
          consoleFormatter
        ),
        colorize : true
      }),
      new transports.File({ 
        format: format.combine(
          isPrivate(),
          consoleFormatter
        ),
        filename,
        colorize : false
      })
    ]
  });
}

/**
 * Handler for private error logs
 * @param  {} info - object
 * @param  {} opts - parameters for winston log
 */
const isPrivate = format((info, opts) => {
  if (info.private) { return false; }
  return info;
});

/**
 * Handler for formatting the console output
 * @param  {} info - object
 */
const consoleFormatter = printf((info, opts) => {

  let errString = '';
  for (row in info.err) {
    errString.concat(row + '\n');
  }

  const timestamp = moment().format(conf.DISPLAY_DATE_FORMAT);
  
  return `${timestamp} ${info.level}: ${info.message} ${errString}`;
});

/**
 * Returns the error object, so we always print the full stack of the error
 * @param  {} err - Error Object
 */
const prepareError = function(err) {
  if (!err) return {};
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
 * @param  {} msg - Any string that needs be printed
 * @param  {} object  - Error object
 */
const error = function(msg, errorObject) {
  return log(msg, errorObject, 'error');
}

/**
 * Logs warnings
 * @param  {} msg - Any string that needs be printed
 * @param  {} object  - Error object
 */
const warn = function(msg, errorObject) {
  return log(msg, errorObject, 'warn');
}

module.exports = {
  info, 
  error,
  warn
}

