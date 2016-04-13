"use strict";
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Instrument = mongoose.model('Instrument');

//Si queremos llevar la autenticación a otros módulos, sólo hace falta copiar las dos líneas siguientes
//var auth = require('../../../lib/auth');
//router.use(auth('admin', 'pass2'));



router.get('/', function(req, res, next) {
    let filters = {};
    let price = {};

    if (req.query.sort !== undefined) {
        var sort = req.query.sort || 'name';
    };

    if (req.query.id !== undefined) {
        filters._id = req.query.id;
    };

    if (req.query.type !== undefined) {
        filters.type = req.query.type;
    }

    if (req.query.buy !== undefined) {
        filters.buy = req.query.buy;
    }

    if (req.query.name !== undefined) {
        filters.name = new RegExp('^' + req.query.name, "i");
    }
    if (req.query.price !== undefined) {
        // if ((/^(-){1}[0-9]+/).test(req.query.precio)) {
        //     precio.$lte = req.query.precio.substr(1);

        // } else if ((/^[0-9]+(-){1}$/).test(req.query.precio)) {
        //     precio.$gte = req.query.precio.substr(0, req.query.precio.length - 1);

        // } else if ((/^[0-9]+$/).test(req.query.precio)) {
        //     precio = req.query.precio;

        // } else if ((/^[0-9]+(-){1}[0-9]+$/).test(req.query.precio)) {
        //     let subIzq = req.query.precio.substr(0, req.query.precio.indexOf("-"));
        //     precio.$gte = subIzq;
        //     let subDer = req.query.precio.substr(req.query.precio.indexOf("-") + 1);
        //     precio.$lte = subDer;

        // }
        filters.price = price;

    }

    if (req.query.brand !== undefined){
        filters.brand = req.query.brand;
    }

    let start = parseInt(req.query.start) || 0;
    let limit = parseInt(req.query.limit) || 0;

    Instrument.list(filters, sort, start, limit, function(err, rows) {
        if (err) {
            res.send('Error:', err);
            return;
        }
        //cuando estén disponibles mando la vista

        res.json({ result: true, instruments: rows });
        return;



    });

});

/*----------------------------Post-----------------------------------------*/


router.post('/', function(req, res) {
    // Instanciamos objeto en memoria
    var instrument = new Instrument(req.body);
    // Lo guardamos en la BD
    instrument.save(function(err, newRow) {
        if (err) {
            res.json({ result: false, err: err });
            return;
        }
        res.json({ result: true, row: newRow });
    });
});

/*----------------------------Delete-----------------------------------------*/

router.delete('/:id', function(req, res) {
    Instrument.remove({ _id: req.params.id }, function(err) {
        if (err) {
            res.send("Instrument not found", err);
            return;
        }
        res.send("Instrument deleted");
    });
});


/*----------------------------Update-----------------------------------------*/


router.put('/:id', function(req, res) {
    //Para actualizar varios hay que usar en options
    var options = {};
    // var options = {multi:true}; Para actualizar varios usar multi
    Instrument.update({ _id: req.params.id }, { $set: req.body }, options, function(err, data) {
        if (err) {
            res.send("Instrument not found", err);
            return;
        }

        res.json({ result: true, row: data });

    });
});


module.exports = router;
