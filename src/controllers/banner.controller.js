/**
 * Endpoints for banner controller
 * @module bannerController
 */

'use strict';

const logger        = require('../utils/logger');
const gmaps         = require('../external-apis/google');
const deep          = require('../external-apis/deep-ai');

/**
 * @api {all} /banner/get
 * @apiGroup banner
 * @apiDescription Gets the latest image to be displayed. Gets the image with the place id, processes it in deepAI and returns it.
 *
 * @apiSuccess {String} result Message containing success code.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "result": "Success",
 *       "image": "imageURL"
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