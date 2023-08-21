const express = require("express");
const router = express.Router();
const user = require("../../models/user");

// Handle user registration
router.post("/", async (req, res) => {
  try {
    // Log the user registration request body
    console.log('User Registration: ', req.body);

    // Get the user collection from the database
    const userCollection = req._db.getCollection("user");

    // Create a new user object with data from the request body
    const newUser = { ...user };
    newUser.username = req.body.username;
    newUser.password = req.body.password;
    newUser.email = req.body.email;
    newUser.spotifyURI = req.body.spotifyURI;
    newUser.profileImgMinURL = req.body.profileImgMinURL;

    // Check whether the user with the same email already exists
    const isEmailDuplicated = (await userCollection.count({
      email: newUser.email,
    })) > 0 ? true : false;

    // Handle duplicate email case
    if (isEmailDuplicated) {
      res.json({
        message: "The email already exists, please use another one",
      });
    } else {
      // Insert the new user into the user collection
      await userCollection.insertOne(newUser);

      // Respond with success message
      res.json({
        message: "Create user successfully",
      });
    }
  } catch (e) {
    // Handle errors during user registration
    res.json({
      message: `Create new user failed, ${e.message}`,
    });
  }
});

module.exports = router;
