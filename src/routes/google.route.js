/**
 * Endpoints for google apis
 * @module googleRoutes
 */

'use strict';

const google = require('../controllers/google.controller');

module.exports = {

  open: function(router) {
    router.get('/google/autocomplete', google.autocomplete);
  },

  admin: function(router) {
  }
};