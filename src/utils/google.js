/**
 * Module for handling google utilities
 * @module googleUtil
 */
const gmaps = require('@google/maps');
const conf  = require('../conf');
const q     = require('q');

class GoogleMaps {
  constructor() {
    this.geolock = 'au';
    this.language = 'en';

    this.key = conf.GOOGLE_MAPS_API_KEY;
    this.client = gmaps.createClient({
      key : this.key,
      Promise: q.Promise
    });
  }

  /**
   * Geocodes an address 
   * @param {String} address 
   * @return {Promise} A promise that resolves with the geodata or rejects on geocode error
   */
  geocode(address) {
    return this.client.geocode({
      address: address,
      language: this.language,
      components: { country: this.geolock }
    }).asPromise().then((result) => {
      if (result.hasOwnProperty('json') && result.json.hasOwnProperty('results')) return result.json.results;
      return Promise.reject(result);
    });
  }

  autocomplete(query) {
    return this.client.placesAutoComplete({
      input: query, 
      language: this.language,
      components: { country: this.geolock }
    }).asPromise().then((result) => {
      if (result.hasOwnProperty('json') && result.json.hasOwnProperty('predictions')) return result.json.predictions;
      return Promise.reject(result);
    });
  }
}

module.exports = new GoogleMaps();
