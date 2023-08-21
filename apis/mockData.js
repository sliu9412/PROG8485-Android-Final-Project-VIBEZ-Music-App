const express = require("express");
const router = express.Router();
const user = require("../models/user");
const homeResponse = require("../models/homeResponse");

// Endpoint for inserting mock data
router.get("/mock", async (req, res) => {
  try {
    // Clear previous records
    await req._db.dropDatabase();

    // Insert mock users
    const userCollection = req._db.getCollection("user");
    const user1 = { ...user };
    user1.email = "test1@example.com";
    user1.username = "user1";
    user1.password = "password";
    user1.spotifyURI = "spotify:user:ls053xoocawmsoldxixqvsfuj";

    const user2 = { ...user };
    user2.email = "test2@example.com";
    user2.username = "user2";
    user2.password = "password";
    user2.spotifyURI = "spotify:user:ls053xoocawmsoldxixqvsfuj";

    await userCollection.insertMany([user1, user2]);

    // Insert mock home items
    const homeCollection = req._db.getCollection("home");
    const homeResponse1 = { ...homeResponse };
    homeResponse1.username = "user1";
    homeResponse1.avatar = "https://http.dog/100.jpg";
    homeResponse1.musicTitle = "musicTitle1";
    homeResponse1.musicArtist = "musicArtist1";
    homeResponse1.photo = "https://http.dog/100.jpg";
    homeResponse1.postTime = "2023-08-08";
    homeResponse1.text =
      "This is the first time you have access to this website and will be available soon.";
    homeResponse1.musicCover = "https://http.dog/100.jpg";

    const homeResponse2 = { ...homeResponse };
    homeResponse2.username = "user1";
    homeResponse2.avatar = "https://http.dog/100.jpg";
    homeResponse2.musicTitle = "musicTitle2";
    homeResponse2.musicArtist = "musicArtist2";
    homeResponse2.photo = "https://http.dog/100.jpg";
    homeResponse2.postTime = "2023-08-08";
    homeResponse2.text =
      "This is the first time you have access to this website and will be available soon.";
    homeResponse2.musicCover = "https://http.dog/100.jpg";

    const homeResponse3 = { ...homeResponse };
    homeResponse3.username = "user2";
    homeResponse3.avatar = "https://http.dog/100.jpg";
    homeResponse3.musicTitle = "musicTitle3";
    homeResponse3.musicArtist = "musicArtist3";
    homeResponse3.photo = "https://http.dog/100.jpg";
    homeResponse3.postTime = "2023-08-08";
    homeResponse3.text =
      "This is the first time you have access to this website and will be available soon.";
    homeResponse3.musicCover = "https://http.dog/100.jpg";

    await homeCollection.insertMany([
      homeResponse1,
      homeResponse2,
      homeResponse3,
      { ...homeResponse3 },
      { ...homeResponse3 },
      { ...homeResponse3 },
      { ...homeResponse3 },
      { ...homeResponse3 },
      { ...homeResponse3 },
      { ...homeResponse3 },
      { ...homeResponse3 },
      { ...homeResponse3 },
      { ...homeResponse3 },
      { ...homeResponse3 },
      { ...homeResponse3 },
      { ...homeResponse3 },
      { ...homeResponse3 },
    ]);

    res.json({
      message: "Insert Data Successfully",
    });
  } catch (e) {
    res.status(400).json({
      message: `Insert Data failed, ${e.message}`,
    });
  }
});

module.exports = router;
