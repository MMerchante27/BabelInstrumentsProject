"use strict";
// Conectar con driver:  var conn = require('../lib/connectMongo');

var conn = require('../lib/connectMongoose');
var mongoose = require('mongoose');

// Creo el esquema

var userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    favorites: []
});

// Método estático
userSchema.statics.list = function(filters, sort, cb) {
    // preparamos la query sin ejecutar ( no ponemos callback a find)

    var query = User.find(filters);
    //añadimos más parámetros a la query
    query.sort(sort);

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
var User = mongoose.model('User', userSchema);
