/**
 * * Genres routes
*/

const express = require('express');

//? Require controller
const genresController = require('../controllers/genres');

//? Load the middleware
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validate = require('../middleware/validate');
const { validateGenre } = require('../utilities/utils');

//Todo: Initialize new router
const router = express.Router();

//* Get all genres
router.get('/', genresController.getGenres);

//* Add Genre
router.post('/', [auth, validate(validateGenre)], genresController.addGenre);

//* Update Genre
router.put('/:id', [auth, validate(validateGenre)], genresController.updateGenre);

//* Delete Genre
router.delete('/:id', [auth, admin], genresController.deleteGenre);

//* Get specific genre
router.get('/:id', genresController.getSingleGenre);


module.exports = router;