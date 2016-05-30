var express = require('express');

module.exports = function (postRouter) {
  var router = express.Router({ mergeParams: true });

  function getRoot(req, res, next) {
    res.locals.view = 'index';
    res.locals.data = { message: "Hello World!" };
    next();
  }

  function respond(req, res, next) {
    res.format({
      json: function () {
        res.json(res.locals.data);
      },
      html: function () {
        res.render(res.locals.view, res.locals.data);
      },
      text: function () {
        res.send(res.locals.data);
      },
      'default': function () {
        res.status(406).send('Not Acceptable');
      }
    });
  };


  router.get('/', getRoot);
  router.use(postRouter);

  router.use(function endRequest(req, res) {
    if (!res.locals.data || res.status === 404) {
      res.status(404)
      res.locals.view = '404';
      res.locals.data = { message: 'Not Found' };
    }

    respond(req, res);
  })

  router.use(function handleError(err, req, res, next) {
    console.error(err.stack)

    res.status(500);
    res.locals.view = '500';
    res.locals.data = { message: 'Internal Error' }

    respond(req, res);
  })

  return router;
}