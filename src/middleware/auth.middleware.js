'use strict';

/**
 * Middleware which handles authentication
 */
const conf    = require('../conf');
const logger    = require('../utils/logger');

const decode = function(req, res, next) {
  logger.info('DECODING');
  next();
};

const adminAuth = function(req, res, next) {
  logger.info('ADMIN AUTH');
  next();
};

module.exports = {
  decode,
  adminAuth,
};
