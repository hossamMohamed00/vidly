//? Require Packages
const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan'); // Requests Logger
const winston = require('winston'); // Error Logger
require('winston-mongodb'); // Mongodb Logger

//? Load Routers 
const home = require("./routes/home");
const genres = require('./routes/genres');
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require('./routes/rentals')
const users = require('./routes/users');
const auth = require('./routes/auth');

//? Load Middleware
const error = require('./middleware/error');

//? Load the database 
require('./db/mongoose'); //TODO: Run the file to connect to the db

//? Check if the environment variable is set ?
if (!process.env.JWT_SECRET) {
   console.error('FETAL ERROR: JWT_SECRET is not defined!');
   process.exit(1);
}

//* Initialize new app instance
const app = express();

//* App Configuration -- Handle Uncaught Exceptions
process.on('uncaughtException', (ex) => {
   console.log('WE GOT AN UNCAUGHT EXCEPTION!');
   winston.error(ex.message, ex);
   //* Best practice to restart the process
   process.exit(1)
})


//* App Configuration -- Handle Unhandled Promise Rejection
process.on('unhandledRejection', (ex) => {
   throw ex;
})

//* Middleware Configuration -- Winston 
winston.add(new winston.transports.File({ filename: "logs/logfile.log" })); // File transport
winston.add(new winston.transports.MongoDB({ db: mongoose.connection.getClient(), level: 'info' })) // MongoDB transport

//* App Configuration -- Using middleware
app.use(morgan('dev'))
app.use(express.json())

//* App Configuration -- Routes
app.use('/', home);
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

//* App Configuration -- Add error middleware
app.use(error);

//* Running the server
const port = process.env.PORT || 3000;
app.listen(port, () =>{
   console.log(`Server is up on ${port}...`);
})