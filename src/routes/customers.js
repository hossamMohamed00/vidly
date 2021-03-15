/**
 * * Customers routes
*/

const express = require('express');

//? Require controller
const customersController = require('../controllers/customers');

//? Load the auth middleware
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

//Todo: Initialize new router
const router = express.Router();

//* Get all customers
router.get('/', customersController.getCustomers);

//* Add customer
router.post("/", auth, customersController.addCustomer);

//* Update customer
router.put("/:id", auth, customersController.updateCustomer);

//* Delete customer
router.delete("/:id", [auth, admin], customersController.deleteCustomer);

//* Get single customer
router.get('/:id', customersController.getSingleCustomer)

//Todo: Export the router
module.exports = router;