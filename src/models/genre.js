/**
 * * Genre Model.
 */
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50
	}
});

const Genre = mongoose.model('Genres', schema);

module.exports = Genre;