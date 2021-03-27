/**
 * * Movies Controller.
 */

const Movie = require('../models/movie');
const Genre = require('../models/genre');
const { validateMovie, isValidId } = require('../utilities/utils');
const asyncMiddleware = require('../middleware/async');

//* Get all movies
exports.getMovies = asyncMiddleware(async (req, res) => {
	const movies = await Movie.find().sort('title');
	res.send(movies);
});

//* Add a movie
exports.addMovie = asyncMiddleware(async (req, res) => {
	//? validate inputs
	const { error } = validateMovie(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	//* Find the genre
	const genre = await Genre.findById(req.body.genreId);
	if (!genre) return res.status(400).send('Invalid genre!');

	//* Create the movie
	const movie = new Movie({
		title: req.body.title,
		genre: {
			_id: genre._id,
			name: genre.name,
		},
		numberInStock: req.body.numberInStock,
		dailyRentalRate: req.body.dailyRentalRate,
	});

	//* Save the movie
	await movie.save();

	res.send(movie);
});

//* Update a movie
exports.updateMovie = asyncMiddleware(async (req, res) => {
	//? validate inputs
	const { error } = validateMovie(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	//? validate the movie id
	if (!isValidId(req.params.id))
		return res.status(400).send('Invalid movie id!');

	//? validate the genre id
	if (!isValidId(req.body.genreId))
		return res.status(400).send('Invalid genre id!');

	//TODO: Find the genre
	const genre = await Genre.findById(req.body.genreId);
	if (!genre) return res.status(400).send('Invalid genre Id!');

	//* Update the movie
	const movie = await Movie.findByIdAndUpdate(
		req.params.id,
		{
			title: req.body.title,
			genre: {
				_id: genre._id,
				name: genre.name,
			},
			numberInStock: req.body.numberInStock,
			dailyRentalRate: req.body.dailyRentalRate,
		},
		{ new: true }
	);

	res.send(movie);
});

//* Delete a movie
exports.deleteMovie = asyncMiddleware(async (req, res) => {
	//* Validate the id
	if (!isValidId(req.params.id))
		return res.status(400).send('Invalid movie id!');

	//* Find the Movie and delete
	const movie = await Movie.findByIdAndRemove(req.params.id);

	//! If not found a Movie
	if (!movie) return res.status(404).send('Movie not found!');

	//* Send the deleted Movie to the client
	res.send(movie);
});

//* Get single movie
exports.getSingleMovie = asyncMiddleware(async (req, res) => {
	//* Validate the id
	if (!isValidId(req.params.id))
		return res.status(400).send('Invalid Movie id!');

	//* Find the Movie
	const movie = await Movie.findById(req.params.id);

	//! If not found a Movie
	if (!movie) return res.status(404).send('Movie not found!');

	//* Send the Movie to the client
	res.send(movie);
});
