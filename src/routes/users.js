/**
 * * Users routes
 */
const express = require('express');

//? Require controller
const usersControllers = require('../controllers/users');

//? Load the auth middleware
const auth = require('../middleware/auth');

//Todo: Initialize new router
const router = express.Router();

//* Register user
router.post('/', usersControllers.registerUser);

//* Get user data
router.get('/me', auth, usersControllers.getUser);


module.exports = router;
