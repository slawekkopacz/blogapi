var express = require('express');
var config = require('./../../config');
var mongoose = require('mongoose');

module.exports = function (postService) {

  var router = express.Router({ mergeParams: true });

  function getPostList(req, res, next) {
    postService.getAll(function (err, posts) {
      if (err) {
        next(err, req, res, next);
      }

      res.locals.view = 'posts/posts'
      res.locals.data = posts;
      next();
    });
  }

  function getPost(req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(404);
      next();
    }

    postService.getById(req.params.id.toString(), function (err, post) {
      if (err) {
        next(err, req, res, next);
      }

      res.locals.view = 'posts/post'
      res.locals.data = post;
      next();
    });
  }

  router.get('/posts', getPostList);
  router.get('/posts/:id', getPost);

  return router;
}