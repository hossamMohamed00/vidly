/**
 * * Customers Model.
 */

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
       type: String,
       required: true,
       minlength: 3,
       maxlength: 50
    },
    isGold: {
       type: Boolean,
       default: false
    },
    phone: {
       type: String,
       minlength: 3,
       maxlength: 50,
       required: true
    }
});

const Customer = mongoose.model("Customers", schema);

module.exports = Customer; 