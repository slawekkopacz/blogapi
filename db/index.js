var mongoose = require('mongoose');
var log = require('./../utils/log.js');

module.exports = function connect(dbConnectionString) {

  mongoose.connect(dbConnectionString);

  mongoose.connection.on('connected', function () {
    log.info('Mongoose connection opened.');
  });

  mongoose.connection.on('error', function (err) {
    log.error('Mongoose connection error: ' + err);
  });

  mongoose.connection.on('disconnected', function () {
    log.error('Mongoose connection disconnected.');
  });
}
