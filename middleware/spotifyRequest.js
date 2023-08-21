/**
 * Middleware to add a function for making authorized requests to the Spotify API.
 * Adds a function to the response object for making authorized requests to the Spotify API.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Callback to move to the next middleware.
 */
const e = require("express");

module.exports = (req, res, next) => {
  // Define the Spotify API request function and attach it to the response object.
  res._sr = (spotify_api, requestMethod = "GET", shouldAuthorize = true) =>  {
    if (shouldAuthorize) {
      // Log information about the Spotify API request and authorization token.
      console.log('spotify middleware', spotify_api, req._token);
      
      // Make a fetch request to the Spotify API with authorization.
      return fetch(spotify_api, {
        method: requestMethod,
        headers: {
          Authorization: req._token,
        },
      }).then((response) => {
        return response.json();
      });
    } else {
      // Make a fetch request to the Spotify API without authorization.
      return fetch(spotify_api, {
        method: requestMethod,
      }).then((response) => response.json());
    }
  };
  
  // Move to the next middleware.
  next();
};
