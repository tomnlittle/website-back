/**
 * Middleware for authentication and decoding
 * @module middleware
 */
'use strict';

/**
 * Middleware which handles authentication
 */
const conf    = require('../conf');
const logger    = require('../utils/logger');

/**
 * All requests are served through this function,
 * 
 * @param {*} req - Incoming request to decode 
 * @param {*} res - Repsonse code - if needed
 * @param {*} next - next function in stack
 */
const decode = function(req, res, next) {
  logger.info('DECODING');
  next();
};

/**
 * In addition to the decode above, if the request requires
 * elevated privileges then we need to run the function below to check
 * the users access rights
 * 
 * @param {*} req - Incoming request to check for access 
 * @param {*} res - Repsonse code - if needed
 * @param {*} next - next function in stack
 */
const adminAuth = function(req, res, next) {
  logger.info('ADMIN AUTH');
  next();
};

module.exports = {
  decode,
  adminAuth
};
