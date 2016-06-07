var mongoose = require('mongoose');
var httpStatus = require('http-status');
var _ = require('lodash');

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
    // todo validate beofre?
    postService.save(req.body, (err, savedPost) => {
      if (err) {
        return next(err, req, res, next);
      }

      res.locals.data = savedPost.toResponseObject();
      res.location(getLocationBase(req, res.locals.data.id));
      res.status(httpStatus.CREATED);
      return next();
    });
  }

  function getLocationBase(req, id) {
    return `${req.protocol}://${req.get('Host')}${req.url}/${id}`;
  }
}