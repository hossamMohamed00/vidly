/* eslint-disable indent */
//? This module will used to run integration tests for genres
const request = require('supertest');
const Genre = require('../../models/genre');

let server;
describe('/api/genres', () => {
	//? This method will be called before every test.
	beforeEach(() => server = require('../../index')); //* load the server);
	afterEach( async () => { 
		await server.close();
		//* Clean the db
		await Genre.deleteMany({}); // will remove all genre
	});

	describe('GET /', () => {
		it('should return all genres', async () => {
			//* Add two genre to DB
			await Genre.collection.insertMany([
				{ name: 'genre1' },
				{ name: 'genre2' }
			]);
         const res = await request(server).get('/api/genres');
         expect(res.status).toBe(200);
			expect(res.body.length).toBe(2);
			expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();			
			expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();			
		});
	});

	describe('GET /:id', () => {
		it('should return a genre if valid id is passed', async () => {
				const genre = new Genre({ name: 'genre1' });
				await genre.save();

				const res = await request(server).get('/api/genres/' + genre.id );
				expect(res.status).toBe(200);
				expect(res.body).toHaveProperty('name', 'genre1');

		});
	});
});