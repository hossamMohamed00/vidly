const User  = require('../../../models/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

describe('user.generateAuthToken', () => {
	it('should return a valid JWT', async () => {
		const payload = {
			_id: new mongoose.Types.ObjectId().toHexString(),
			isAdmin: true
		};

		const user = new User(payload);
		const token = await user.generateAuthToken();

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		expect(decoded).toMatchObject({ _id: payload._id, isAdmin: true });
	});
});