var mongoose = require('mongoose');
var httpStatus = require('http-status');

module.exports = function (postService) {

  return {
    getPostList,
    getPost,
  };

  function getPostList(req, res, next) {
    postService.getAll(function (err, posts) {
      if (err) {
        next(err, req, res, next);
      }

      res.locals.view = 'post/list'
      res.locals.data = posts;
      next();
    });
  }

  function getPost(req, res, next) {
    var id = req.params.id.toString();
    validateModelId(id, res, next);

    postService.getById(id, function (err, post) {
      if (err) {
        next(err, req, res, next);
      }

      res.locals.view = 'post/post'
      res.locals.data = post;
      next();
    });
  }

  function validateModelId(id, res, next) {
    if (!postService.isValidModelId(id)) {
      res.status(httpStatus.NOT_FOUND);
      next();
    }
  }
}