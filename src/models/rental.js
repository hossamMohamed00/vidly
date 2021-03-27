/**
 * * Rentals Model.
 */
const mongoose = require('mongoose');

// //* Load model to get its Schema 
// const Genre = require('./genres');

const rentalSchema = new mongoose.Schema({
	customer: {
		type: new mongoose.Schema({
			name: {
				type: String,
				required: true,
				minlength: 3,
				maxlength: 50,
			},
			isGold: {
				type: Boolean,
				default: false,
			},
			phone: {
				type: String,
				minlength: 3,
				maxlength: 50,
				required: true,
			},
		}),
		required: true,
	},
	movie: {
		type: new mongoose.Schema({
			title: {
				type: String,
				required: true,
				trim: true,
				minlength: 5,
				maxlength: 255,
			},
			dailyRentalRate: {
				type: Number,  
				min: 0,
				max: 255,
				required: true,
			},
		}),
		required: true 
	},
	dateOut: {
		type: Date,
		required: true,
		default: Date.now
	},
	dateReturned: {
		type: Date
	},
	rentalFee: {
		type: Number,
		min: 0
	}
});

module.exports = mongoose.model('Rentals', rentalSchema);