/**
 * Imports all the routes into this single index
 * @module index
 */
'use strict';

const banner        = require('./banner.route');
const google        = require('./google.route');

module.exports = {
  banner,
  google
};