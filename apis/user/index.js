const express = require("express");
const router = express.Router();

// Import route handlers
const getUserInfo = require("./getUserInfo");
const createUser = require("./createUser");
const login = require("./login");

// Use the imported route handlers
router.use(getUserInfo);
router.use(createUser);
router.use("/login", login);

module.exports = router;
