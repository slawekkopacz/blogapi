var express = require('express');
var postService = require('./../../services/postService.js');

var router = express.Router();

router.get('/posts', getPostList);
router.get('/posts/:id', getPost);


function getPostList(req, res) {
  // TODO encapsulate in controller or sth?
  postService.getAll(function (err, posts) {
    if (err) {
      handleError(err, res);
    }

    res.send(posts);
  });
}

function getPost(req, res) {
  res.send('Post id: ' + req.params.id);
}

function handleError(err, res) {
  console.error(err);
  res.status(500).send('Error 500 message');
}

module.exports = router;
