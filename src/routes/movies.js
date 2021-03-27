/**
 * * Movie routes.
*/

const express = require('express');

//? Require controller
const moviesController = require('../controllers/movies');

//? Load the auth middleware
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

//Todo: Initialize new router
const router = express.Router();

//* Get all movies
router.get('/', moviesController.getMovies);

// //* Add movies
router.post('/', auth, moviesController.addMovie);

// //* Update movies
router.put('/:id', auth, moviesController.updateMovie);

// //* Delete movies
router.delete('/:id', [auth, admin], moviesController.deleteMovie);

// //* Get specific movies
router.get('/:id', moviesController.getSingleMovie);


module.exports = router;
