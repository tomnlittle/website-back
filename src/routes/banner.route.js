/**
 * Endpoints for the website banner
 * @module bannerRoutes
 */

'use strict';

const banner = require('../controllers/banner.controller');

module.exports = {

  open: function(router) {
    router.get('/banner/get', banner.get);
  },

  admin: function(router) {
    router.get('/banner/admin', banner.admin);
  }
};