/**
 * Middleware for authentication and decoding
 * @module middleware
 */

'use strict';

/**
 * Middleware which handles authentication
 */
const logger          = require('../../logging');
const status          = require('http-status-codes');
const NotFound        = require('../../errors/404');

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
  logger.info('[admin middleware]');

  // decode the token

  // log success or failure 

  // log request endpoint

  next();
};

const unhandledCatch = function(req, res) {
  // Just call handleError at this stage
  handleError(new NotFound, req, res);
};

/**
 * Request error handler
 * 
 * @param {*} err - error code from express
 * @param {*} req - Incoming request to check for access 
 * @param {*} res - Repsonse code - if needed
 * @param {*} next - next function in stack
 */
const handleError = function(err, req, res) {
  logger.alert('[Router] ' + err.name, err);
  res.status(status.NOT_FOUND).json();
  return;
}; 

module.exports = {
  parse,
  adminAuth,
  unhandledCatch
};
