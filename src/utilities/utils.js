//? Here will be some functions that used frequently

//* Require important packages
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi); //? To help us validate the objectId
const mongoose = require('mongoose');
/*--------------------------------*/
//TODO: Functions to validate

exports.isValidId = (id) => {
	// return id.match(/^[0-9a-fA-F]{24}$/);
	return mongoose.Types.ObjectId.isValid(id);
};

exports.validateCustomer = customer => {
	const scheme = Joi.object({
		name: Joi.string().min(3).max(50).required(),
		phone: Joi.string().min(3).max(50).required(),
		isGold: Joi.boolean(),
	});

  

	const result = scheme.validate(customer);

	return result;
};

exports.validateGenre = genre => {
	const scheme = Joi.object({
		name: Joi.string().min(3).required(),
	});

	const result = scheme.validate(genre);

	return result;
};

exports.validateMovie = movie => {
	const scheme = Joi.object({
		title: Joi.string().min(5).max(50).required(),
		genreId: Joi.objectId().required(),
		numberInStock: Joi.number().min(0).max(255).required(),
		dailyRentalRate: Joi.number().min(0).max(255).required()
	});

	const result = scheme.validate(movie);
	return result;
};

exports.validateRental = rental => {
	//* Here we validate the objectId
	const scheme = Joi.object({
		customerId: Joi.objectId().required(),
		movieId: Joi.objectId().required()
	});

	const result = scheme.validate(rental);
	return result;
};

exports.validateUser = user => {
	const scheme = Joi.object({
		name: Joi.string().min(3).max(50).required(),
		email: Joi.string().min(3).max(255).required().email(),
		password: Joi.string().min(3).max(255).required()
	});

	const result = scheme.validate(user);
	return result;
};

exports.validateAuth = userData => {
	const scheme = Joi.object({
		email: Joi.string().min(3).max(255).required().email(),
		password: Joi.string().min(3).max(255).required(),
	});

	const result = scheme.validate(userData);
	return result;
};
/*--------------------------------*/
