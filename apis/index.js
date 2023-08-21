const express = require("express");
const router = express.Router();

// Importing various route modules
const user = require("./user");          // User-related routes
const playlists = require("./playlists");  // Playlist-related routes
const home = require("./home");            // Home feed-related routes
const mockData = require("./mockData");    // Mock data routes (if any)

// Setting up routes using imported modules
router.use("/user", user);         // User-related routes will have '/user' prefix
router.use(playlists);             // Playlist-related routes
router.use(home);                  // Home feed-related routes
router.use(mockData);              // Mock data routes (if any)

module.exports = router;
