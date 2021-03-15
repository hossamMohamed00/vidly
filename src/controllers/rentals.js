/**
 * * Rentals Controller.
 */

//? Require some dependencies
const Fawn = require('fawn');
const mongoose = require('mongoose');
const Rental = require('../models/rental'); 
const Customer = require('../models/customer');
const Movie = require('../models/movie');
const { validateRental } = require("../utilities/utils");
const asyncMiddleware = require("../middleware/async");

//Todo: Initialize fawn 
Fawn.init(mongoose);

//* Get all rentals
exports.getRentals = asyncMiddleware( async (req, res) => {
   const rentals = await Rental.find().sort("-dateOut");
   res.send(rentals);
})

//* Create a new rental
exports.createRental = asyncMiddleware( async (req, res) => {
   //? validate inputs
   const { error } = validateRental(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   //? Validate customer
   const customer = await Customer.findById(req.body.customerId);
   if (!customer) res.status(400).send("Invalid customer!");

   //? Validate movie
   const movie = await Movie.findById(req.body.movieId);
   if (!movie) res.status(400).send("Invalid movie!");

   //Todo: Check if the movie dose not exist in stock
   if(await Movie.findById(req.body.movieId).numberInStock === 0) return res.status(400).send('Movie not in stock!'); 

   //* If everything is ok, create the new rental
   let rental = new Rental({
      customer: {
         _id: customer._id,
         name: customer.name,
         phone: customer.phone,
         isGold: customer.isGold
      }, 
      movie: {
         _id: await Movie.findById(req.body.movieId)._id,
         title: await Movie.findById(req.body.movieId).title,
         dailyRentalRate: await Movie.findById(req.body.movieId).dailyRentalRate
      }
   })

   //Todo: Crate task (transaction) to do some db operations
   new Fawn.Task()
      .save('Rentals', rental)
      .update('Movies', { _id: mongoose.Types.ObjectId(await Movie.findById(req.body.movieId)._id)}, {
         $inc: { numberInStock: -1 }
      })
      .run({useMongoose: true}); // Run the task

   //* Finally send the rental
   res.send(rental);

})