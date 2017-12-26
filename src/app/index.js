'use strict';

const momentTimezone     = require('moment-timezone');
const moment             = require('moment');

/ * Express is used for routing * /;
const express            = require('express');


/ * Logger class writes to the console and log files * /;
const logger             = require('../logging');
const conf               = require('../config');


// Crash server if Server is configured for the incorrect region
//                  -> Everything is handled in epoch UTC
if (momentTimezone.tz.guess() !== 'Australia/Sydney') {
  logger.error('Region incorrectly set, should be "Australia/Sydney" ', {
    'Current TZ': momentTimezone.tz.guess(),
    'TimezoneOffset': moment().utcOffset()
  });
  process.exit(1);
}

// Set the default timezone
moment.tz.setDefault('UTC');

// Initialise the express app
const app = express();

app.routes = require('../routes')(app);


// Uncaught exception handler
process.on('uncaughtException', (err) => {
  logger.error('[app] Uncaught exception encountered', err);
});

// Unhandled promise rejection handler
process.on('unhandledRejection', (err) => {
  logger.error('[app] Uncaught promise rejection', err);
});

// Get app to listen on default port
app.listen(conf.PORT);

logger.info('Backend running on port', conf.PORT);
logger.info('Backend running on', {port: conf.PORT});
