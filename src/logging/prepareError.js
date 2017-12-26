'use strict';

/**
 * Returns the error object, so we always print the full stack of the error
 * @param  {} err - Error Object
 */
module.exports = (error) => {
  // if (!error) return {};

  console.log(error);

  let errStr = '';
  // Check if err is an object
  if (error === Object(error)) {
    const keys = Object.keys(error);
    keys.forEach((key) => {
      // Special Case 
      if (key === 'stack') return;
      errStr += key + ' ' + error[key];
    });
  } else if (error === String(error)) {
    errStr = error;
  }

  const stack = error.stack || null;

  return {
    error: errStr,
    stack
  };
};