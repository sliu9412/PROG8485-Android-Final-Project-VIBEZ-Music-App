/**
 * Middleware to close the MongoDB client connection after the response has finished.
 * Closes the client connection when the response is complete.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Callback to move to the next middleware.
 */
module.exports = (req, res, next) => {
  // Set up an event listener on the response's "finish" event.
  res.on("finish", () => {
    try {
      // Attempt to close the MongoDB client connection.
      req._client.close();
    } catch (e) {
      // If there's an error during closing, log the error message.
      console.log(e.message);
    }
  });

  // Move to the next middleware.
  next();
};
