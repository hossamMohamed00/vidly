/**
 * * Authentication routes
 */
const express = require("express");

//? Require controller
const usersControllers = require("../controllers/users");

//Todo: Initialize new router
const router = express.Router();

//* Authenticate user
router.post("/", usersControllers.authenticateUser);

module.exports = router;
