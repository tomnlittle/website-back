/**
 * Handles Redis components 
 * @module Redis
 */

const redis     = require('redis');
const conf      = require('../config');
const winston   = require('../logging');
const Q         = require('q');

class Redis {
  constructor() {
    this.client = redis.createClient();
    this.EXPIRY = conf.JWT_EXPIRE_SECONDS;
  }

  /**
   * Adds an object to the redis cache and returns a unique key
   * @param {String} key - Key for storage in redis
   * @param {Object} object - the data to be stored in the redis 
   */
  addSession(key, object) {

    // Add Key to object
    object.key = key;

    // Turn object into string
    const value = JSON.stringify(object);

    // Add to redis, give it the key, value and set the expiry
    this.client.set(key, value, 'EX', this.EXPIRY);

    return key;
  }

  /**
   *  Gets data from the redis database, returns a promise
   * @param {*} key 
   */
  getSession(key) {
    const defer = Q.defer();
    this.client.get(key, (err, result) => {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(JSON.parse(result));
      }
    });
    return defer.promise;
  }

  /**
   * Deletes a session from the cache
   * @param {*} key 
   */
  deleteSession(key) {
    // Check the session exists
    return this.getSession(key).then((result) => {
      if (!result) Promise.reject();
      // If it exists, remove the data and set the expiry to one second
      return this.client.set(key, '', 'EX', 1);
    }).catch((err) => {
      winston.error('Failed to delete redis session', {
         
        stack: err.stack,
        err: err
      });
    });
  }
}

module.exports = new Redis();