const responseTime       = require('response-time');

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

module.exports = (app) => {

  // Initialise the router
  const router = express.Router({ strict: true });

  // http://expressjs.com/en/4x/api.html#express.json
  router.use(express.json({
    inflate: false, // when false does not handle deflated bodies 
    limit: 1000, // in Bytes
    reviver: null, // second argument into json.parse
    strict: true, // Only accept arrays and objects
    type: 'application/json', // Type of requests
    verify: undefined // function call 
  }));

  // Import the response time library 
  router.use(responseTime());

  // Helmet
  router.use(helmet());

  // Setup Body Parser
  router.use(bodyParser.json({ limit: '5mb' }));

  // Setup the middleware 
  //router.use(require('./middleware'));

  // Add Routes
  //router.use(require('./endpoints'));

  return router;
};
