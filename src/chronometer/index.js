/**
 * Handler for all date and time events, standardises time handling throughout the app
 * @module chronometer
 */
'use strict';

// const momentTimezone     = require('moment-timezone');
// const moment             = require('moment');

// Crash server if Server is configured for the incorrect region
//                  -> Everything is handled in epoch UTC
// if (momentTimezone.tz.guess() !== 'Australia/Sydney') {
//   app.logger.error('Region incorrectly set, should be "Australia/Sydney" ', {
//     'Current TZ': momentTimezone.tz.guess(),
//     'TimezoneOffset': moment().utcOffset()
//   });
//   process.exit(1);
// }

// // Set the default timezone
// moment.tz.setDefault('UTC');