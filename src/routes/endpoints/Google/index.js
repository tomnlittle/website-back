/**
 * Endpoints for google apis
 * @module googleRoutes
 */

'use strict';

const google = require('./controller');

module.exports = {

  open: function(router) {
    router.get('/google/autocomplete', google.autocomplete);
  }
};