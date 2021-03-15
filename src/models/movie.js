/**
 * * Movies Model.
 */

const mongoose = require('mongoose');

//* Load Genre model to get its Schema 
const Genre = require('./genre');

const moviesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  genre: {
    type: Genre.schema,
    required: true,
  },
  numberInStock: {
    type: Number,
    min: 0,
    max: 255,
    required: true
  },
  dailyRentalRate: {
     type: Number,
     min: 0,
     max: 255,
     required: true
  }
});

module.exports = mongoose.model('Movies', moviesSchema);