var express = require('express');

module.exports = {
  create: create,
}

function create() {
  var app = express();

  app.get('/', function (req, res) {
    res.send('Hello World!');
  });

  return app;
}