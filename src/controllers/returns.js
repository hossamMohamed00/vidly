/**
 * * Returns Controller
 */

const asyncMiddleware = require('../middleware/async');
const Rental = require('../models/rental');
const Movie = require('../models/movie');

exports.addReturn = asyncMiddleware(async (req, res) => {
	//? Validate inputs done via validate middleware

	//? Find rental with the given inputs
	const rental = await Rental.lookup(req.body.customerId, req.body.movieId);
	if(!rental) return res.status(404).send('Rental not found!');

	//* Validate if the rental already processed
	if(rental.dateReturned) return res.status(400).send('Rental already processed!');

	//TODO: Call return method to do some rental related calculations
	rental.return();

	await rental.save();

	//* Increase the number of stock for the movie
	await Movie.updateOne({ _id: rental.movie._id }, { $inc: { numberInStock: 1 }  });
	
	return res.send(rental);
});