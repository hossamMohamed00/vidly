/**
 * * Movie routes.
*/

const express = require('express');

//? Require controller
const moviesController = require('../controllers/movies');

//? Load middleware
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validate = require('../middleware/validate');
const { validateMovie } = require('../utilities/utils');

//Todo: Initialize new router
const router = express.Router();

//* Get all movies
router.get('/', moviesController.getMovies);

//* Add movies
router.post('/', [auth, validate(validateMovie)], moviesController.addMovie);

//* Update movies
router.put('/:id', [auth, validate(validateMovie)], moviesController.updateMovie);

//* Delete movies
router.delete('/:id', [auth, admin], moviesController.deleteMovie);

//* Get specific movies
router.get('/:id', moviesController.getSingleMovie);


module.exports = router;
