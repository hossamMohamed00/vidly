/* eslint-disable indent */
const User = require('../../models/user');
const Rental = require('../../models/rental');
const Movie = require('../../models/movie');
const mongoose = require('mongoose');
const request = require('supertest');
const moment = require('moment');

describe('/api/returns', () => {
   let server;
   let customerId;
   let movieId;
   let movie;
   let rental;
   let authToken;

   //TODO: Define the happy path
   let exec = () => {
      //* Send the request to the server
      return request(server)
      .post('/api/returns')
      .set('x-auth-token', authToken)
      .send({ customerId, movieId });
   };

   beforeEach(async () => {
      server = require('../../index'); //* load the server;
      
      customerId = mongoose.Types.ObjectId();
      movieId = mongoose.Types.ObjectId();
      authToken = await new User().generateAuthToken();

      movie = new Movie({
         _id: movieId,
         title: '12345',
         dailyRentalRate: 2,
         genre: { name: '12345' },
         numberInStock: 10
      });

      rental = new Rental({
         customer: {
            _id: customerId,
            name: '12345',
            phone: '12345'
         },
         movie: {
            _id: movieId,
            title: '12345',
            dailyRentalRate: 2
         }
      });

      await rental.save();
      await movie.save();
   });

	afterEach( async () => { 
		await server.close();

		//* Clean the db
      await Rental.deleteMany({});
      await Movie.deleteMany({});
	});

   it('should return 401 if client is not authenticated', async () => {
      //* Change the parameter
      authToken  = '';
      
      //* Call exec to send the request
      const res = await exec();
      
      //* Make assertion
      expect(res.status).toBe(401);
   });
   
   it('should return 400 if customerId is not provided' , async () => {
      //* Change the parameter
      customerId  = '';

      //* Call exec to send the request
      const res = await exec(); 
      
      //* Make assertion
      expect(res.status).toBe(400);
   });

   it('should return 400 if movieId is not provided' , async () => {
      //* Change the parameter
      movieId  = '';

      //* Call exec to send the request
      const res = await exec(); 
      
      //* Make assertion
      expect(res.status).toBe(400);
   });

   it('should return 404 if no rental found for this customer/movie', async () => {
      //* Clean the rental database first (created on beforeEach)
      await Rental.deleteMany({});

      //* Call exec to send the request
      const res = await exec();
      
      //* Make assertion
      expect(res.status).toBe(404);
   });

   it('should return 400 if the rental already processed', async () => {
      //* Simulate the rental already processed
      rental.dateReturned = new Date();
      await rental.save();
      
      //* Call exec to send the request
      const res = await exec();
      
      //* Make assertion
      expect(res.status).toBe(400);
   });

   it('should return 200 if we get a valid request', async () => {
      //* Call exec to send the request
      const res = await exec();
      
      //* Make assertion
      expect(res.status).toBe(200);
   });

   it('should set the dateReturned if input is valid', async () => {
      //* Call exec to send the request
      await exec();
      
      //* Get the rental and check on it
      const rentalInDb = await Rental.findById(rental._id);

      //* Make assertion
      const diff = new Date() - rentalInDb.dateReturned;

      expect(diff).toBeLessThan(10 * 1000); //* 10 seconds.
   });

   it('should set the rentalFee if input is valid', async () => {
      //* Modify the dateOut to be at least one day
      rental.dateOut = moment().add(-7, 'days').toDate(); // 7 days ago
      await rental.save();

      //* Call exec to send the request
      await exec();
      
      //* Get the rental and check on it
      const rentalInDb = await Rental.findById(rental._id);

      //* Make assertion
      expect(rentalInDb.rentalFee).toBe(14); //14 = 7 days out * 2 rental rate
   });

   it('should increase the movie stock if input is valid', async () => {
      //* Call exec to send the request
      await exec();
      
      //* Get the movie and check on it
      const movieInDb = await Movie.findById(movieId);

      //* Make assertion
      expect(movieInDb.numberInStock).toBe(movie.numberInStock + 1);
   });

   it('should return the rental if input is valid', async () => {
      //* Call exec to send the request
      const res = await exec();

      //* Make assertion
      expect(res.body).toHaveProperty('dateOut');
      expect(res.body).toHaveProperty('dateReturned');
      expect(res.body).toHaveProperty('rentalFee');
      expect(res.body).toHaveProperty('customer');
      expect(res.body).toHaveProperty('movie');

      expect(Object.keys(res.body)).toEqual(
         expect.arrayContaining(['dateOut', 'dateReturned', 'rentalFee', 'customer', 'movie'])
      );
   });
});