/**
 * Logger tool
 * @module logger
 */

'use strict';

const { createLogger, format, transports }       = require('winston');
const { printf, colorize}                        = format;
const moment                                     = require('moment');
const fs                                         = require('fs');

const conf                                       = require('../config');

const customLevels = {
  levels: {
    alert: 0,
    info: 1,
    warn: 2,
    error: 3
  }
};

/**
 * Handler for private error logs
 * @param  {} info - object
 * @param  {} opts - parameters for winston log
 */
const isPrivate = format((info) => {
  if (info.private) { return false; }
  return info;
});

/**
* Handler for formatting the console output
* @param  {} info - object
*/
const consoleFormatter = printf((info) => {

  let errString = '';
  Object.keys(info.err).forEach((key) => {
    if (info.err[key]) {
      errString += info.err[key];
    }
  });

  const timestamp = moment().format(conf.DISPLAY_DATE_FORMAT);

  return `${timestamp} ${info.level}: ${info.message} ${errString}`;
});


class Logger {
  /**
   * Instantiates the winston logger and initialises the logs folder 
   */
  constructor() {
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

    this.logger = createLogger({
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
   * This is the main function called
   * @param  {} msg - Any string that needs be printed
   * @param  {} object  - Error object
   * @param  {} privateMode - Whether the log should be written to disk or not 
   */
  log(msg, object, level, privateMode = false) {
  
    const error = this.prepareError(object);
    
    return this.logger.log({
      private: privateMode,
      level: level,
      message: msg, 
      err: error
    });
  }

  /**
   * Returns the error object, so we always print the full stack of the error
   * @param  {} err - Error Object
   */
  prepareError(error) {
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
   * logs info 
   * @param  {} msg - Any string that needs be printed
   * @param  {} object  - Error object
   * @param  {} privateMode - Whether the log should be written to disk or not 
   */
  info(msg, errorObject, privateMode) {
    return this.log(msg, errorObject, 'info', privateMode);
  }

  /**
   * Logs errors
   * @param  {} msg - Any string that needs be printed
   * @param  {} object  - Error object
   */
  error(msg, errorObject) {
    return this.log(msg, errorObject, 'error');
  }

  /**
   * Logs warnings
   * @param  {} msg - Any string that needs be printed
   * @param  {} object  - Error object
   */
  warn(msg, errorObject) {
    return this.log(msg, errorObject, 'warn');
  }

  /**
   * Logs warnings
   * @param  {} msg - Any string that needs be printed
   * @param  {} object  - Error object
   */
  alert(msg, errorObject) {
    return this.log(msg, errorObject, 'alert');
  }
}

module.exports = new Logger();

