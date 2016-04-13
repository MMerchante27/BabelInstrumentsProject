	"use strict";
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Instrument = mongoose.model('Instrument');



/* GET anuncios listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
