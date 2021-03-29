/**
 * * Authentication Middleware.
 */

const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
	//TODO: Get the token from the request header
	const token = req.header('x-auth-token');
	if(!token) return res.status(401).send('Access denied. No token provided!');

	//? Verify the token 
	try {
		const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);

		//Todo: If everything is ok, add the decodedPayload to the request object
		req.user = decodedPayload;

		//* Add The control to the next middleware
		next();
	} catch (ex) {
		res.status(400).send('Invalid token!');
	}
};

module.exports = auth;