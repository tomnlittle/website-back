'use strict';

/**
 * Returns the error object, so we always print the full stack of the error
 * @param  {} err - Error Object
 */
module.exports = (error) => {

  let errStr = '';
  const keys = Object.keys(error);
  keys.forEach((key) => {

    // Special Case for the stack
    if (key === 'stack') return;

    // Otherwise add the key to the err string
    errStr += key + ' : ' + error[key];
    
    // If the keys length is greater than one then add a new line 
    if (keys.length > 1) errStr += '\n';
  });

  // In the case where error is just a string the keys array will be empty
  // And thus the errStr will be empty, so just make the errStr = the error
  if (errStr.length === 0) errStr = error;

  // Get the stack object off of the error object if it exists
  const stack = error.stack || null;

  return {
    error: errStr,
    stack
  };
};