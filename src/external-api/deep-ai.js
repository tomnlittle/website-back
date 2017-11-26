/**
 * Module for handling the Deep AI API
 * @module Deep-AI
 */

const request = require('request');
const conf  = require('../conf');
const q     = require('q');

class DeepAI {
  constructor() {
    this.key = conf.DEEP_AI_KEY;
    this.apiURL = 'https://api.deepai.org/api/deepdream';
  }

  processImageURL(imageURL) {
    const deferred = q.defer();

    request.post({
      url: this.apiURL,
      formData: {
        content: imageURL
      },
      headers: {
        'Api-Key': this.key
      }
    }, (err, httpResponse, body) => {
      if (err) deferred.reject(new Error(err));
      deferred.resolve(JSON.parse(body));
    });
    return deferred.promise;
  }
}

module.exports = new DeepAI();
