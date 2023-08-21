/**
 * Middleware to extract and store the authorization token from request headers.
 * Extracts the token from the request headers and stores it for further use.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Callback to move to the next middleware.
 */
module.exports = (req, res, next) => {
  try {
    // Attempt to extract the authorization token from request headers.
    req._token = req.headers.authorization;
  } catch (e) {
    // If there's an error during extraction, handle and log the error.
    console.error('token middleware error: ', e);
    
    // Set the token to null due to extraction failure.
    req._token = null;
    
    // Log the error message.
    console.log(e.message);
  }
  
  // Move to the next middleware.
  next();
};
