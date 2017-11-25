'use strict';

const momentTimezone     = require('moment-timezone');
const moment             = require('moment');
const logger             = require('./utils/logger');
const conf               = require('./conf');
const express            = require('express');
const session            = require('express-session');
const passport           = require('passport');


// Crash server if Server is configured for the incorrect region
//                  -> Everything is handled in epoch UTC
if (momentTimezone.tz.guess() !== "Australia/Sydney") {
    logger.error('Region incorrectly set, should be "Australia/Sydney" ', {
    'Current TZ': momentTimezone.tz.guess(),
    'TimezoneOffset': moment().utcOffset()
  });
  process.exit(1);
}

// Set the default timezone
moment.tz.setDefault('UTC');

console.log(moment(), conf.FLICKR_API_KEY, conf.ENVIRONMENT);

logger.error('here')
logger.info('here')

// Initialise the express app

