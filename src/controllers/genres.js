/**
 * * Genres Controller.
 */

const Genre = require('../models/genre');
const { isValidId } = require('../utilities/utils');
const asyncMiddleware = require('../middleware/async');

//* Get All Genres 
exports.getGenres = asyncMiddleware(async (req, res) => {
	const genres = await Genre.find().sort('name');
	res.send(genres);
});

//* Add a Genre
exports.addGenre = asyncMiddleware( async (req, res) => {   
	//? validate inputs done with validate middleware

	//* Define new Genre
	const genre = new Genre({ name: req.body.name });

	//* Save the Genre
	await genre.save();

	//* Send the saved Genre to the client
	res.send(genre);
});

//* Update a Genre
exports.updateGenre = asyncMiddleware( async (req, res) => {
	//? validate inputs done with validate middleware

	//? Validate the id
	if (!isValidId(req.params.id)) return res.status(400).send('Invalid Genre id!');

	//* Find the Genre and update
	const genre = await Genre.findByIdAndUpdate( req.params.id, { name: req.body.name }, { new: true });

	//! If not found a Genre
	if (!genre) return res.status(404).send('Genre not found!');

	//* Send the updated Genre to the client
	res.send(genre);
});

//* Delete a Genre
exports.deleteGenre = asyncMiddleware( async (req, res) => {
	//? Validate the id
	if (!isValidId(req.params.id)) return res.status(400).send('Invalid Genre id!');

	//* Find the Genre and delete
	const genre = await Genre.findByIdAndRemove(req.params.id);

	//! If not found a Genre
	if (!genre) return res.status(404).send('Genre not found!');

	//* Send the deleted Genre to the client
	res.send(genre);
});

//* Get a single Genre
exports.getSingleGenre = asyncMiddleware( async (req, res) => {
	//? Validate the id
	if (!isValidId(req.params.id)) return res.status(400).send('Invalid Genre id!');
   
	//* Find the Genre
	const genre = await Genre.findById(req.params.id);

	//! If not found a Genre
	if (!genre) return res.status(404).send('Genre not found!');

	//* Send the Genre to the client
	res.send(genre);
});

