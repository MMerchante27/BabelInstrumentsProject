"use strict";
// Conectar con driver:  var conn = require('../lib/connectMongo');

var conn = require('../lib/connectMongoose');
var mongoose = require('mongoose');

// Creo el esquema

var instrumentSchema = mongoose.Schema({
    name: String,
    type: String, 
    price: Number,
    photo: String,
    brand: String,
    description: String,
    sound_url: String,
    video_url: String,
    buy: String
});

// Método estático
 instrumentSchema.statics.list = function(filters, sort, start, limit, cb) {
        // preparamos la query sin ejecutar ( no ponemos callback a find)
        var query = Instrument.find(filters); //Añadir filters

        //añadimos más parámetros a la query
        query.sort(sort);
        if (start != 0) {
            query.skip(start);

        }
        if (limit != 0) {
            query.limit(limit); 
          }


        //La ejecutamos
        query.exec(function(err, rows) {
            if (err) {
                cb(err);
                return;
            }
            cb(null, rows);
            return;

        });
    };
//Lo registro en mongoose
var Instrument = mongoose.model('Instrument', instrumentSchema);





