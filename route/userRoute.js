const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Create a new user in the database and return the created user in the response.
router.post("/signup", userController.signup);
// Login a user and return the user in the response.
router.post("/login", userController.login);

module.exports = router;