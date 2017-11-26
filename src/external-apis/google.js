/**
 * Module for handling google utilities
 * @module google
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

  /**
   * Gets place id from autocomplete
   * @param {String} query
   * @return {Promise} A promise that resolves with the place data or rejects on error
   */
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

  /**
   * Gets data for a location using the places API
   * @param {String} placeID
   * @return {Promise} A promise that resolves with the geodata or rejects on geocode error
   */
  getPlace(placeID) {
    return this.client.place({
      placeid: placeID,
      language: this.language,
      components: { country: this.geolock }
    }).asPromise().then((result) => {
      console.log(result);
    });
  }
}

module.exports = new GoogleMaps();
