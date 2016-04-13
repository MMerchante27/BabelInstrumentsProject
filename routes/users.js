"use strict";
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../models/user_model');
var crypto = require("crypto");
var User = mongoose.model('User');


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* GET users listing. */
router.get('/form', function(req, res, next) {
    var sort = req.query.sort || 'name';
    var User = mongoose.model('User');
    User.list(sort, function(err, rows) {
        if (err) {
            res.send('error', err);
            return;
        }
        //cuando estén disponibles mando la vista
        res.render('userForm', { users: rows });
        return;

    });

});

router.post('/', function(req, res, next) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    let filter = {};
    filter.name = name;
    User.findOne(filter, function(err, row) {
        if (err) {
            res.send('An error ocurred', err);
            return;
        }
        if (!row) {
            var sha256 = crypto.createHash("sha256");
            sha256.update(password, "utf8"); //utf8 here
            var result = sha256.digest("base64");
            var user = new User({ name: name, email: email, password: result });
            user.save(function(err, user) {
                if (err) {
                    console.log("Error!" + err);
                    return;
                }
                res.send('Created user.- \n' + "Name: " + user.name + "\n" + "Email: " + user.email);
                return;

            });
            
        } else res.send("An user is already registered");

    });
});



module.exports = router;
