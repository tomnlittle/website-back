/**
 * Module for handling the Deep AI API
 * @module Deep-AI
 */

const app     = require('../../app');
const request = require('request');
const q       = require('q');

class DeepAI {
  constructor(main) {
    this.key = main.config.DEEP.DEEP_AI_KEY;
    this.apiURL = main.config.DEEP.URL;
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

module.exports = new DeepAI(app);
