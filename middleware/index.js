const express = require("express");
const router = express.Router();
const getToken = require("./getToken");
const setSetting = require("./setSettings");
const spotifyRequest = require("./spotifyRequest");
const connectDB = require("./connectDB");
const disconnectDB = require("./disconnectDB");

// req
router.use(setSetting);
router.use(getToken);
router.use(connectDB);

//res
router.use(spotifyRequest);
router.use(disconnectDB);

module.exports = router;
