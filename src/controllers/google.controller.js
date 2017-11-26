/**
 * Endpoints for google controller
 * @module googleController
 */

'use strict';

const logger        = require('../utils/logger');
const gmaps         = require('../external-apis/google');
const status        = require('http-status-codes');

/**
 * @api {all} /google/autocomplete
 * @apiGroup flickr
 * @apiDescription Gets the list of possible locations
 *
 * @apiSuccess {String} result Message containing success code.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "result": "Success",
 *       "data": autocompleteData
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
const autocomplete = function(req, res) {
  const searchQuery = req.query.searchQuery || null;
  
  if(!searchQuery) {
    res.status(status.BAD_REQUEST).json({
      result: 'Invalid Search Query'
    }); 
    return;
  }

  return gmaps.autocomplete(searchQuery).then((result) => {
    const predictions = [];

    for (const object of result) {
      predictions.push({
        prediction: object.description,
        placeID: object.place_id,
        photo: object.reference
      });
    }

    res.status(status.OK).json({
      predictions: predictions
    });
  }).catch((err) => {
    logger.error('[google-maps] AutoComplete', err);      
    res.status(status.INTERNAL_SERVER_ERROR); 
  });
};

module.exports = {
  autocomplete
};