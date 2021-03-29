/**
 * * Rentals routes
 */
const express = require('express');

//? Require controller
const rentalsControllers = require('../controllers/rentals');

//? Load middleware
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { validateRental } = require('../utilities/utils');

//Todo: Initialize new router
const router = express.Router();

//* Get all rentals
router.get('/', rentalsControllers.getRentals);

//* Create a new rental
router.post('/', [auth, validate(validateRental)], rentalsControllers.createRental);

module.exports = router;