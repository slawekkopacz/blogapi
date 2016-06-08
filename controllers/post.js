var mongoose = require('mongoose');
var httpStatus = require('http-status');
var _ = require('lodash');
var helper = require('./helper.js');

module.exports = function (postService) {

  return {
    getPostList,
    getPost,
    createPost,
  };

  function getPostList(req, res, next) {
    postService.getAll(function (err, posts) {
      if (err) {
        return next(err, req, res, next);
      }

      res.locals.view = 'post/list'
      res.locals.data = posts.map(p => p.toResponseObject());
      return next();
    });
  }

  function getPost(req, res, next) {
    var id = req.params.id.toString();
    if (! postService.isValidModelId(id)) {
      res.status(httpStatus.NOT_FOUND);
      return next();
    }

    postService.getById(id, function (err, post) {
      if (err) {
        return next(err, req, res, next);
      }

      res.locals.view = 'post/post'
      res.locals.data = post && post.toResponseObject();
      return next();
    });
  }

  function createPost(req, res, next) {
    if (_.isEmpty(req.body)) {
      res.status(httpStatus.BAD_REQUEST);
      return next();
    }

    postService.save(req.body, (err, savedPost) => {
      if (err) {
        if (helper.isValidationError(err)) {
          res.status(httpStatus.BAD_REQUEST);
          res.locals.errorMessage = helper.getValidationErrorMessage(err);
          return next();
        }
        return next(err, req, res, next);
      }

      res.locals.data = savedPost.toResponseObject();
      res.location(helper.getLocationBase(req, res.locals.data.id));
      res.status(httpStatus.CREATED);
      return next();
    });
  }


}