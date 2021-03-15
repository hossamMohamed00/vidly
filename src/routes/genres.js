/**
 * * Genres routes
*/

const express = require('express');

//? Require controller
const genresController = require('../controllers/genres');

//? Load the middlewares
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

//Todo: Initialize new router
const router = express.Router();

//* Get all genres
router.get("/", genresController.getGenres);

//* Add Genre
router.post('/', auth, genresController.addGenre);

//* Update Genre
router.put("/:id", auth, genresController.updateGenre);

//* Delete Genre
router.delete("/:id", [auth, admin], genresController.deleteGenre);

//* Get specific genre
router.get('/:id', genresController.getSingleGenre);


module.exports = router;