/**
 * Logger tool
 * @module logger
 */

'use strict';

const { createLogger, format, transports }       = require('winston');
const { combine, printf, colorize}               = format;
const moment                                     = require('moment');
const fs                                         = require('fs');

const conf                                       = require('../conf');

const customLevels = {
  levels: {
    alert: 0,
    info: 1,
    warn: 2,
    error: 3
  }
};

// Single global variable
let winstonLogger;

/**
 * Instantiates the winston logger and initialises the logs folder 
 */
const instantiate = function() {
  const logsFolder = conf.LOGS_FOLDER;
  const debugFolder = logsFolder + 'debug/';
  const alertsFolder = logsFolder + 'alerts/';

  // Create the logs folder
  try {
    fs.mkdirSync(logsFolder);
    fs.mkdirSync(debugFolder);
    fs.mkdirSync(alertsFolder);
  } catch (err) {
    // If the err code is not the fact the folder already exists
    if (err.code !== 'EEXIST') {
      console.error('[app] Could not create folders" ', {
        err: err
      });
      process.exit(1);
    }
  }

  const filename = moment().toISOString();
  const debug = debugFolder + filename;
  const alert = alertsFolder + filename;

  return createLogger({
    levels: customLevels.levels,
    transports: [
      new transports.Console({ 
        levels: customLevels.levels,
        level: 'error',
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
        filename: debug,
        colorize : false
      }),
      new transports.File({ 
        level: 'alert',
        format: format.combine(
          isPrivate(),
          consoleFormatter
        ),
        filename: alert,
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
  Object.keys(info.err).forEach((key) => {
    if (info.err[key]) {
      errString += info.err[key];
    } 
  });

  const timestamp = moment().format(conf.DISPLAY_DATE_FORMAT);
  
  return `${timestamp} ${info.level}: ${info.message} ${errString}`;
});

/**
 * Returns the error object, so we always print the full stack of the error
 * @param  {} err - Error Object
 */
const prepareError = function(error) {
  if (!error) return {};
  
  const err = JSON.stringify(error) || null;
  const message = error.message || null;
  const stack = error.stack || null;
  
  return {
    err, 
    message, 
    stack,
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

/**
 * Logs warnings
 * @param  {} msg - Any string that needs be printed
 * @param  {} object  - Error object
 */
const alert = function(msg, errorObject) {
  return log(msg, errorObject, 'alert');
}

module.exports = {
  info, 
  error,
  warn,
  alert
}

