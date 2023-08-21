const express = require("express");
const router = express.Router();
const user = require("../../models/user");

// Handle user login
router.post("/", async (req, res) => {
  try {
    // Create a login account object with data from the request body
    const login_account = { ...user };
    login_account.email = req.body.email;
    login_account.password = req.body.password;

    // Get the user collection from the database
    const userCollection = req._db.getCollection("user");

    // Retrieve the account based on email and password
    const retrieveAccount = await userCollection.findOne({
      email: login_account.email,
      password: login_account.password,
    });

    // Handle successful login
    if (retrieveAccount) {
      console.log('User logged in: ', retrieveAccount);
      res.json({
        message: null,
        username: retrieveAccount.username,
        spotifyURI: retrieveAccount.spotifyURI,
        userID: retrieveAccount._id.toString(),
      });
    } else {
      // Handle login failure
      res.json({
        message: "Email and password do not match, please try again",
      });
    }
  } catch (e) {
    // Handle errors during the login process
    res.json({
      message: `Login Process Failed: ${e.message}`,
    });
  }
});

module.exports = router;
