const mongoose = require('mongoose');
const logger = require('./logging')();

let db = '';
if(process.env.NODE_ENV === 'test') {
	db = process.env.VIDLY_DB_TESTS;
} else {
	db = process.env.VIDLY_DB;
}

module.exports = () => {
	mongoose
		.connect(db, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false, // because it's deprecated
		})
		// eslint-disable-next-line quotes
		.then(() => logger.info(`Connected to ${db} successfully!`));
	//? Catch ?? -- No because make the app throw an ex and catch it[Logging, terminate the process]  
};