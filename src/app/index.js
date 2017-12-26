'use strict';

// Initialise the express app
const app = require('express')();

app.status = require('http-status-codes');
app.logger = require('../logging');
app.config = require('../config');
app.chrono = require('../chronometer');
app.routes = require('../routes')(app);

// Uncaught exception handler
process.on('uncaughtException', (err) => {
  app.logger.error('[app] Uncaught exception encountered', err);
});

// Unhandled promise rejection handler
process.on('unhandledRejection', (err) => {
  app.logger.error('[app] Uncaught promise rejection', err);
});

// Get app to listen on default port
app.listen(app.config.PORT);

app.logger.info('Backend running on port', app.config.PORT);
