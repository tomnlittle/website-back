const status        = require('http-status-codes');

module.exports = function NotFound(message, errorCode) {

  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name;
  this.message = message || 'The requested resource couldn\'t be found';
  this.statusCode = status.NOT_FOUND;
  this.errorCode = errorCode || status.NOT_FOUND;
};