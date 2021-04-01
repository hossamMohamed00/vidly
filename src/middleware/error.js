/*
   * Error Middleware
   * This middleware will be called id there is an exception 
   * Here we add all the logic for dealing with the errors
*/
//? require winston to log the error in file
const winston = require('winston'); 
module.exports = (err, req, res) => {
	//* Log the error
	winston.error(err.message, err );
	console.log(err);
	//* Send proper message to the user
	res.status(500).send('An error occurred!');
};