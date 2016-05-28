var express = require('express');
var Post = require('./../models').Post;
var postService = require('./../services/service.js')(Post);
var postRouter = require('./../router/posts')(postService);
var router = require('./../router')(postRouter);

module.exports = {
  create: create,
}

function create() {
  var app = express();
  app.use(router);
  return app;
}