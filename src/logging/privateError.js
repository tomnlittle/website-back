'use strict';

const { format }       = require('winston');

/**
 * Handler for private error logs
 * @param  {} info - object
 * @param  {} opts - parameters for winston log
 */
module.exports = format((info) => {
  if (info.private) { return false; }
  return info;
});