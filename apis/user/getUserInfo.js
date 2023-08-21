const express = require("express");
const router = express.Router();

// Handle getting user information
router.get("/", async (req, res) => {
  try {
    let actualAccount;

    // Fetch user information from Spotify
    const userInfo = await res._sr(req._settings.spotify.userInfo);
    console.log('Get User info', userInfo);

    // Get the user collection from the database
    const userCollection = req._db.getCollection("user");

    // Find the user based on email or Spotify URI
    if (userInfo.email) {
      actualAccount = await userCollection.findOne({
        email: userInfo.email
      });
    } else {
      actualAccount = await userCollection.findOne({
        spotifyURI: userInfo.uri
      });
    }
    console.log('found user:', actualAccount);

    // Respond with user information or message
    if (actualAccount) {
      res.json({
        message: userInfo,
        actualID: String(actualAccount._id.toString()),
        username: actualAccount.username,
      });
    } else {
      res.json({
        message: userInfo
      });
    }
  } catch (e) {
    // Handle errors during user information retrieval
    res.json({
      message: `Error: ${e.message}`,
    });
  }
});

module.exports = router;
