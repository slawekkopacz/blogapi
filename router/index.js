var express = require('express');
var postsRouter = require('./posts');

var router = express.Router();

router.get('/', getRoot);
router.use(postsRouter);


function getRoot(req, res) {
  res.send('Hello World!');
}


module.exports = router;