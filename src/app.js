'use strict';

const momentTimezone     = require('moment-timezone');
const moment             = require('moment');
const express            = require('express');
const session            = require('express-session');
const passport           = require('passport');
const RedisStore         = require('connect-redis')(session)

const logger             = require('./utils/logger');
const conf               = require('./conf');


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

// Initialise the express app
const app = express();
app.use(session({
  store: new RedisStore({
    url: config.redisStore.url
  }),
  secret: config.redisStore.secret,
  resave: false,
  saveUninitialized: false
}))

// Import Passport authentication
app.use(passport.initialize());
app.use(passport.session());

