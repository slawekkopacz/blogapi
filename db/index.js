var config = require('./../config');
var mongoose = require('mongoose');

mongoose.connect(config.db.connString);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connection opened.');
});

mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose connection disconnected.');
});
