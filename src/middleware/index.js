/**
 * Middleware for authentication and decoding
 * @module middleware
 */

'use strict';

/**
 * Middleware which handles authentication
 */
const logger          = require('../utils/logger');

const NotFound        = require('../errors/404');

/**
 * All requests are served through this function,
 * 
 * @param {*} req - Incoming request to decode 
 * @param {*} res - Repsonse code - if needed ie. 404 etc
 * @param {*} next - next function in stack
 */
const parse = function(req, res, next) {
  logger.info('[parse middleware]');
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
  logger.info('[admin auth]');

  // decode the token

  // log success or failure 

  // log call

  next();
};

const unhandledCatch = function(req, res, next) {
  console.log('here');
  next(res.status(404));
};

/**
 * Request error handler
 * 
 * @param {*} err - error code from express
 * @param {*} req - Incoming request to check for access 
 * @param {*} res - Repsonse code - if needed
 * @param {*} next - next function in stack
 */
const handleError = function(err, req, res, next) {
  logger.alert('', new NotFound());
  next()
};

module.exports = {
  parse,
  adminAuth,
  unhandledCatch
};
