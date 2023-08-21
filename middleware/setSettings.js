/**
 * Middleware to attach application settings to the request object.
 * Attaches the application settings to the request for access in subsequent middleware.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Callback to move to the next middleware.
 */
const settings = require("../settings");

module.exports = (req, res, next) => {
  // Attach the application settings to the request object.
  req._settings = settings;
  
  // Move to the next middleware.
  next();
};
