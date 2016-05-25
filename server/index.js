var express = require('express');
var router = require('./../router');

module.exports = {
  create: create,
}

function create() {
  var app = express();
  app.use(router);
  return app;
}