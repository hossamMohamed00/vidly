//? Packages
const morgan = require('morgan'); //* Incoming Requests Logger
const express = require('express');

//? Load Routers
const home = require('../routes/home');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');
const returns = require('../routes/returns');
const errorMiddleware = require('../middleware/error');

module.exports = (app) => {
	app.use(morgan('dev')); //* Logger for the incoming requests.
	app.use(express.json()); //* Parse the body of the request
  
	/*    Routes    */
	app.use('/', home);
	app.use('/api/genres', genres);
	app.use('/api/customers', customers);
	app.use('/api/movies', movies);
	app.use('/api/rentals', rentals);
	app.use('/api/users', users);
	app.use('/api/auth', auth);
	app.use('/api/returns', returns);
	app.use(errorMiddleware);
};
