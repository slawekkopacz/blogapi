var express = require('express');

module.exports = function (postRouter) {
  var router = express.Router();

  router.get('/', getRoot);
  router.use(postRouter);

  function getRoot(req, res) {
    res.send('Hello World!');
  }

  return router;
}