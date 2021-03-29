/**
 * * Authentication routes
 */
const express = require('express');

//? Require controller
const usersControllers = require('../controllers/users');

//? Require middleware
const validate = require('../middleware/validate');
const { validateAuth } = require('../utilities/utils');


//Todo: Initialize new router
const router = express.Router();

//* Authenticate user
router.post('/', validate(validateAuth), usersControllers.authenticateUser);

module.exports = router;
