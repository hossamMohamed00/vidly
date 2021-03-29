/**
 * * Returns Routes
 */
const express = require('express');

const returnsController = require('../controllers/returns');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

const { validateReturn } = require('../utilities/utils');

//Todo: Initialize new router
const router = express.Router();

router.post('/', [auth, validate(validateReturn)], returnsController.addReturn);

module.exports = router;