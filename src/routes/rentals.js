/**
 * * Rentals routes
 */
const express = require('express');

//? Require controller
const rentalsControllers = require('../controllers/rentals');

//? Load the auth middleware
const auth = require('../middleware/auth');

//Todo: Initialize new router
const router = express.Router();

//* Get all rentals
router.get('/', rentalsControllers.getRentals);

//* Create a new rental
router.post('/', auth, rentalsControllers.createRental);

module.exports = router;