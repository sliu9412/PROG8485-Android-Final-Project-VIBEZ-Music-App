const express = require("express");
const router = express.Router();
const homeModel = require('../models/homeItem');
const ObjectId = require('mongodb').ObjectId;

// Get recent home records
router.get("/home", async (req, res) => {
  try {
    const homeCollection = req._db.getCollection("home");

    // Retrieve recent home records with sorting and limit
    const retrieved_records = await homeCollection
      .find()
      .sort({ "_id" : -1 })
      .limit(req._settings.app.homeFragmentMaxDisplayCount)
      .toArray();

    // Return the retrieved records
    res.json(retrieved_records);
  } catch (e) {
    console.log(`Retrieve Data Failed, ${e.message}`);
    res.json([]);
  }
});

// Publish a new post to the home feed
router.post("/home/publish", async (req, res) => {
  console.log('Post publication ');
  try {
    const homeCollection = req._db.getCollection("home");
    const newPost = { ...homeModel };
    
    // Populate new post data from the request body
    newPost.userID = req.body.userID;

    // Retrieve user information to populate username and userImage
    const userCollection = req._db.getCollection("user");
    const searchID = new ObjectId(req.body.userID);
    const retrieveAccount = await userCollection.findOne({ "_id" : searchID });

    // Handle user information retrieval
    if (retrieveAccount) {
      newPost.username = retrieveAccount.username;
      newPost.userImage = retrieveAccount.profileImgMinURL;
    } else {
      res.status(500).json({
        message: `User with ID ${req.body.userID} does not exist`,
      });
      return;
    }

    // Populate the rest of the new post data
    newPost.trackURI = req.body.trackURI;
    newPost.trackName = req.body.trackName;
    newPost.trackArtist = req.body.trackArtist;
    newPost.trackImage = req.body.trackImage;
    newPost.image = req.body.image;
    newPost.text = req.body.text;

    let actualDate = new Date()
    const offset = actualDate.getTimezoneOffset()
    actualDate = new Date(actualDate.getTime() - (offset*60*1000))
    const strDate = actualDate.toISOString().split('T')[0]

    newPost.postTime = strDate;

    // Insert the new post into the home collection
    await homeCollection.insertOne(newPost);

    // Return success message
    res.json({
      message: "Create new post successfully",
    });
    
  } catch (error) {
    console.error(`Retrieve Data Failed, ${error.message}`, error);
    res.status(500).json({
      message: `Create new post failed, ${error.message}`,
    });
  }
});

module.exports = router;
