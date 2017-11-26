/**
 * Endpoints for flickr controller
 * @module bannerController
 */

'use strict';

const logger        = require('../utils/logger');
const gmaps         = require('../utils/google');

/**
 * @api {all} /flickr/get
 * @apiGroup flickr
 * @apiDescription Gets the latest image to be displayed from flickr.
 *
 * @apiSuccess {String} result Message containing success code.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "result": "Success",
 *       "image": "http://flickr-image-url.com"
 *     }
 *
 * @apiError ServerError Internal server error
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "result": "ServerError"
 *     }
 */
const get = function(req, res) {
  gmaps.geocode('1 cleveland st sydney').then((result) => {
    console.log(result);
  });
  logger.info('get function works');
  res.status(200).json();
  return;
};

/**
 *  Simply a test function for checking admin access
 * @param {*} req 
 * @param {*} res 
 */
const admin = function(req, res) {
  logger.info('admin function works');
  res.status(200).json();
  return;
};

module.exports = {
  get,
  admin
};