/**
 * * Users Controller.
 */

const _ = require('lodash'); //* To deal with objects/arrays
const User = require('../models/user');
const asyncMiddleware = require('../middleware/async');

//* Register User
exports.registerUser = asyncMiddleware( async (req, res) => {
	//? validate inputs done with validate middleware

	//? Check if user is already registered
	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send('User already registered!');

	//Todo: If everything is ok, create user and save it
	//* Here we don't write code to hash the password, because there is a code in the User model done this for us
	user = new User(_.pick(req.body, ['name', 'email', 'password'])); // use lodash to pick the desired properties only
	await user.save();

	//TODO: Generate Authentication Token
	const token = await user.generateAuthToken();

	//Todo: Use lodash to pick the desired properties only.
	user = _.pick(user, ['_id', 'name', 'email']);

	//TODO: Add the token to the body of the response and send it.
	user.token = token;//* when user send special header must start with 'x-'  

	//TODO: Send the user info.
	res.status(201).send(user); 
});

//* Authenticate User 
exports.authenticateUser = asyncMiddleware( async (req, res) => {
	//? validate inputs done with validate middleware
	
	const { errorMsg, user} = await User.findByCredentials( req.body.email, req.body.password);
	if (errorMsg) return res.status(400).send(errorMsg);

	//Todo: Generate Authentication Token
	const token = await user.generateAuthToken();

	//* If everything is ok
	// res.send(_.pick(user, ['_id', 'name', 'email']));
	res.send({token: token});
});

//*
exports.getUser = asyncMiddleware( async (req, res) => {
	//*Note* We already have the userId in req.user from the auth middleware
	const user = await User.findById(req.user._id);
	res.send(_.pick(user, ['_id', 'name', 'email'])); //* Send custom data
});