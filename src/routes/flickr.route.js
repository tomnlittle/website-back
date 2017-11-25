'use strict';

const flickr = require('../controllers/flickr.controller');

module.exports = {

  open: function(router) {
    router.get('/flickr/get', flickr.get);
  },

  admin: function(router) {
    router.get('/flickr/admin', flickr.admin);
  }
}