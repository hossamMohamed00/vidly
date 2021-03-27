/**
 * * Customers Controller.
 */

const Customer = require('../models/customer');
const { isValidId, validateCustomer } = require('../utilities/utils');
const asyncMiddleware = require('../middleware/async');

//* Get all customers
exports.getCustomers = asyncMiddleware(async (req, res) => {
	const customers = await Customer.find().sort('name');
	res.send(customers);
});

//* Add new customer
exports.addCustomer = asyncMiddleware(async (req, res) => {
	//? validate inputs
	const { error } = validateCustomer(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	//* Define new Customer
	const customer = new Customer({
		name: req.body.name,
		phone: req.body.phone,
		isGold: req.body.isGold,
	});

	//* Save the customer
	await customer.save();

	//* Send the saved customer to the client
	res.send(customer);
});

//* Update customer
exports.updateCustomer = asyncMiddleware(async (req, res) => {
	//? Validate the id
	if (!isValidId(req.params.id)) res.status(400).send('Invalid customer id!');

	//? validate inputs
	const { error } = validateCustomer(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	//* Find the customer and update
	const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});

	//! If not found a customer
	if (!customer) return res.status(404).send('customer not found!');

	//* Send the updated customer to the client
	res.send(customer);
});

//* Delete customer
exports.deleteCustomer = asyncMiddleware(async (req, res) => {
	//? Validate the id
	if (!isValidId(req.params.id)) throw new Error('Invalid customer id!');

	//* Find the customer and delete
	const customer = await Customer.findByIdAndRemove(req.params.id);

	//! If not found a customer
	if (!customer) return res.status(404).send('Customer not found!');

	//* Send the deleted customer to the client
	res.send(customer);
});

//* Get single customer
exports.getSingleCustomer = asyncMiddleware(async (req, res) => {
	//? Validate the id
	if (!isValidId(req.params.id)) throw new Error('Invalid customer id!');

	//* Find the customer
	const customer = await Customer.findById(req.params.id);

	//! If not found a customer
	if (!customer) return res.status(404).send('customer not found!');

	//* Send the customer to the client
	res.send(customer);
});
