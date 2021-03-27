/* eslint-disable no-async-promise-executor */
/**
 * * Users Model 
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true,
		minlength: 3,
		maxlength: 55,
	},
	email: {
		type: String,
		unique: true,
		required: true,
		minlength: 3,
		maxlength: 255,
	},
	password: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 1024
	},
	isAdmin: {
		type: Boolean
	}
});

/**
  * * Setup  the middleware ==> to hashing password (plain text) before saving 
  * * we have pre method ==> to do something before (saving, validate, ...) 
  * * we have post method ==> to do something after (saving, validate, ...)
  */

/** 
  * * It is passed in standard func not an arrow func,
  * * Because "this" binding plays an important role,
  * * And as we know arrow func didn't binding this.
*/

/** 
 * Todo: Hash the plain text password before saving
 */
userSchema.pre('save', async function (next) {
	// * this => gives us access to individual user
	const user = this;

	//? Check first, if the password changed (became a plain text) or it's already hashed
	if (user.isModified('password')) {
		//* The second argument is the number of rounds we wanna perform => how many times the hashing algorithm is executed
		//* 8 => is the value which recommended by the original creator of the bcrypt algorithm
		const salt = await bcrypt.genSalt(8);
		user.password = await bcrypt.hash(user.password, salt);
	}

	next(); //* To continue and not hanging on this function

	//? Encryption ==> we can get the original value back
	//? Hashing     ==> Are one way algorithm ==> we can't reverse the proc ess
});
/*-----------------------------------------*/
//TODO: Create a new method on the User Model (Model method)

/**
 * ? Check if the user exist or not ?
 */
userSchema.statics.findByCredentials = async (email, password) => {
	return new Promise(async (resolve) => {
		const user = await User.findOne({ email });

		if (!user) return resolve({ errorMsg: 'Invalid email or password!' });

		//? Check if the password matches or not
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return resolve({ errorMsg: 'Invalid email or password!' });

		//* if everything is ok, return the user
		resolve({ user });
	});
};

/*-----------------------------------------*/
userSchema.methods.generateAuthToken = async function () {
	const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.JWT_SECRET, { expiresIn: '7 days' });
	return token;
};
const User = mongoose.model('User', userSchema);
module.exports = User;