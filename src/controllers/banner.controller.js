/**
 * Endpoints for banner controller
 * @module bannerController
 */

'use strict';

const logger        = require('../utils/logger');
const status        = require('http-status-codes');
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

  return gmaps.getPlace('ChIJv1LEidaxEmsRovFmxB3Vj-g').then((result) => {
    console.log(result.reference)
    return gmaps.getPlacePhoto('CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU');
  }).then((result) => {    
    console.log(result.readable);
    res.status(status.OK).json({
      result: Object.keys(result),
      headers: result.rawHeaders
    });
  }).catch((err) => {
    logger.error('[google-maps] AutoComplete', err);      
    res.status(status.INTERNAL_SERVER_ERROR).json(); 
  });
};

/**
 *  Simply a test function for checking admin access
 * @param {*} req 
 * @param {*} res 
 */
const admin = function(req, res) {
  logger.info('admin function works');
  res.status(status.OK).json();
  return;
};

module.exports = {
  get,
  admin
};