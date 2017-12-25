/**
 * Module for handling google utilities
 * @module google
 */

const gmaps = require('@google/maps');
const conf  = require('../config'); 
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
      language: this.language
    }).asPromise().then((result) => {
      return result;
      if (result.hasOwnProperty('json') && result.json.hasOwnProperty('result')) return result.json.result;
      return Promise.reject(result);
    });
  }

  /**
   * Takes a photo reference, returned on a place id lookup and grabs the photo for the location
   * @param {String} reference - Unique reference for the image, simply called reference in google api calls
   * @param {Integer} width - Max width of the image
   * @param {Integer} height - Max height of the image
   * @return {Promise} 
   */
  getPlacePhoto(reference, width = 400, height = 400) {
    return this.client.placesPhoto({
      photoreference: reference,
      maxwidth: width,
      maxheight: height
    }).asPromise().then((result) => {
      
      return result;
    });
  }
}

module.exports = new GoogleMaps();
