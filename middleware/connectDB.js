const { MongoClient } = require("mongodb");

/**
 * Middleware to establish a connection to the MongoDB database.
 * Binds the database object to the request and sets up collection shortcuts.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Callback to move to the next middleware.
 */
module.exports = async (req, res, next) => {
  try {
    // Create a new MongoClient instance using the provided MongoDB URL.
    const client = new MongoClient(req._settings.mongoDB.url);
    
    // Connect to the MongoDB server.
    await client.connect();
    
    // Bind the database object to the request.
    req._db = client.db(req._settings.mongoDB.database);
    req._client = client;

    // Define a shortcut method to get a collection by name.
    req._db.getCollection = (collection) =>
      req._db.collection(req._settings.mongoDB.collections[collection]);
    
    // Move to the next middleware.
    next();
  } catch (e) {
    // If there's an error during connection, send a 400 response.
    res.status(400).json({
      message: `Connect Database Error: ${e.message}`,
    });
  }
};
