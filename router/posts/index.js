var express = require('express');

var router = express.Router();

router.get('/posts', getPosts);

function getPosts(req, res) {
  res.send('Posts!');
}

module.exports = router;
