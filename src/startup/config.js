module.exports = () => {
	//? Check if the JWT_SECRET is set ?
	if (!process.env.JWT_SECRET) {
		//? Throw a new error -- our infrastructure of the app will handle it with winston
		throw new Error('FETAL ERROR: JWT_SECRET is not defined!');
	}
};