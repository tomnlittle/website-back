'use strict';

const logger        = require('../utils/logger');

const get = function(req, res) {
  logger.info('get function works')
  res.status(200).json({});
  return;
}

module.exports = {
  get
}