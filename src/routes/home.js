/**
 * * Home route.
*/

const express = require("express");

//Todo: Initialize new router
const router = express.Router();

router.get("/", (req, res) => {
  res.send('hello world..!'); 
});

module.exports = router; 