'use strict';

const moment                                     = require('moment');
const conf                                       = require('../config');
const { format }                                 = require('winston');
const { printf }                                 = format;

/**
* Handler for formatting the console output
* @param  {} info - object
*/
module.exports = printf((info) => {

  let errString = '';
  Object.keys(info.err).forEach((key) => {
    if (info.err[key]) {
      errString += info.err[key];
    }
  });

  const timestamp = moment().format(conf.DISPLAY_DATE_FORMAT);

  return `${timestamp} ${info.level}: ${info.message} ${errString}`;
});