"use strict";
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var crypto = require("crypto");
var User = mongoose.model('User');



/*----------------------------Get-----------------------------------------*/



router.get('/', function(req, res) {
    let filters = {};
    if (req.query.name !== undefined) {
        filters.name = req.query.name;
    }
    if (req.query.id !== undefined) {
        filters._id = req.query.id;
    }
    if (req.query.sort !== undefined) {
        var sort = req.query.sort || 'name';
    };
    User.list(filters, sort, function(err, rows) {
        if (err) {
            res.send("An error occurred", err);
            return;
        }
        //cuando estén disponibles mando la vista
        res.json({ result: true, rows: rows });
        return;

    });

});

/*----------------------------Post-----------------------------------------*/

router.post('/', function(req, res, next) {
    var auth = req.body.auth;
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    let filter = {};
    filter.name = name;

    console.log(auth);
    console.log(name);
    console.log(password);
    console.log(filter);

    User.list(filter, 'name', function(err, rows) {
        if (err) {
            res.send('An error ocurred', err);
            return;
        }
        console.log("Fila", rows);
        console.log("length", rows.length);
        if (rows.length !== 0) {
            if (auth === 'true') {
                var sha256 = crypto.createHash("sha256");
                sha256.update(password, "utf8"); //utf8 here
                var result = sha256.digest("base64");
                console.log("Result", result);
                console.log("Password", rows[0].password);
                if (result === rows[0].password) {
                    res.json({ result: true, rows: rows[0] });
                    return;
                } else res.json({ result: false, msg: "Name or password incorrect" });
            } else res.json({ result: false, msg: "This user is already registered" });
        } else {
            if (auth === 'true') {
                res.json({ result: false, msg: "Name or password incorrect" });
            } else {
                var sha256 = crypto.createHash("sha256");
                sha256.update(password, "utf8"); //utf8 here
                var result = sha256.digest("base64");
                var user = new User({ name: name, email: email, password: result });
                user.save(function(err, user) {
                    if (err) {
                        console.log("Error!" + err);
                        return;
                    }
                    res.json({ result: true, rows: rows[0] });
                    return;
                });
            }
        }

    });
});




/*----------------------------Delete-----------------------------------------*/


router.delete('/:id', function(req, res) {
    User.remove({ _id: req.params.id }, function(err) {
        if (err) {
            res.send("User not found", err);
            return;
        }
        res.json("The user has been deleted");
    });
});

/*----------------------------Update-----------------------------------------*/



router.put('/:id', function(req, res) {
    //Para actualizar varios hay que usar en options
    var options = {};
    // var options = {multi:true}; Para actualizar varios usar multi
    let filter = {};
    filter.name = req.body.name;
    User.list(filter, 'name', function(err, rows) {
        if (err) {
            res.send('An error ocurred', err);
            return;
        }
        console.log(rows);
        if (rows.length !== 0) {
            User.update({ _id: req.params.id }, { $set: req.body }, options, function(err, data) {
                if (err) {
                    res.send("User not found", err);
                    return;
                }

                res.json({ result: true, row: data });

            });
        }

    });

});

module.exports = router;
