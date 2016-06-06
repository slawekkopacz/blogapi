var express = require('express');

module.exports = function (postController) {

  var router = express.Router();

  router.route('/posts')
    .get(postController.getPostList)
    .post(postController.createPost);

  router.route('/posts/:id')
    .get(postController.getPost);

  return router;
}