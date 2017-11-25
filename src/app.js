'use strict';

const momentTimezone     = require('moment-timezone');
const moment             = require('moment');

/ * Express is used for routing * / 
const express            = require('express');
const responseTime       = require('response-time');
const bodyParser         = require('body-parser');

/ * The below three functions are yet unused - authentication not yet implmented * /
const passport           = require('passport');
const session            = require('express-session');
const RedisStore         = require('connect-redis')(session);

/ * Logger class writes to the console and log files * /
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

// Import the response time library 
app.use(responseTime());

// Initialise the redis cache store
app.use(session({
  store: new RedisStore(),
  secret: 'secretkey_currently_unused_no_authentication',
  resave: false,
  saveUninitialized: false
}));

// Import passport
app.use(passport.initialize());
app.use(passport.session());

// Initialise the router
const router = express.Router();

// Import middleware
const middleware = require('./middleware/');

// Import the routes
const routes = require('./routes')

// Add the decoder to the router
router.use(middleware.decode);

// Add open functions to router 
for (const route in routes) routes[route].open(router);

// Add admin authentication layer
router.use(middleware.adminAuth);
for (const route in routes) routes[route].admin(router);

app.use('/', router);

// Get app to listen on default port
app.listen(conf.PORT);

logger.info('Backend running on port', conf.PORT);
