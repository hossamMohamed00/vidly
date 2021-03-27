const winston = require('winston'); // Error Logger
// require('winston-mongodb'); // Mongodb Logger
 
module.exports = () => {
	const logger = winston.createLogger({
		transports: [
			// * Write all logs with level `error` and below to `logfile.log`
			new winston.transports.File({
				filename: 'logs/logfile.log',
				level: 'error',
				format: winston.format.json()
			}),
			// new winston.transports.MongoDB({
			// 	level: 'error',
			// 	db: process.env.VIDLY_DB,
			// 	options: {
			// 		// MongoDB options
			// 		useUnifiedTopology: true,
			// 	}
			// }),
			new winston.transports.Console({
				level: 'info',
				format: winston.format.combine(
					winston.format.colorize(),
					winston.format.simple()
				)
			})
		]
	});

	//* Handle Uncaught Exceptions
	process.on('uncaughtException', (ex) => {
		//  console.log("WE GOT AN UNCAUGHT EXCEPTION!");
		logger.error(ex.message, ex);
    
		//* Best practice to restart the process
		process.exit(1);
	});

	//* Handle Unhandled Promise Rejection
	process.on('unhandledRejection', (ex) => {
		throw ex;
	});

	return logger;
};
