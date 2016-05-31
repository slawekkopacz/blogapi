var express = require('express');
var Post = require('./../models').Post;
var postService = require('./../services/service.js')(Post);
var postController = require('./../controllers/post.js')(postService);
var postRouter = require('./../routers/post')(postController);
var router = require('./../routers')(postRouter);

module.exports = {
  create: create,
}

function create() {
  var app = express();
  app.use(router);
  app.set('view engine', 'pug');
  return app;
}