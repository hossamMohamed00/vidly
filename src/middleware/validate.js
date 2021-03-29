/*
* * Validate middleware
* * This will be used to validate the inputs of the requests
*/

module.exports = (validator) => {
	return (req, res, next) => {
		const { error } = validator(req.body);
		if(error) return res.status(400).send(error.details[0].message);

		next();
	};
};
 