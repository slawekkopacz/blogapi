var express = require('express');
var httpStatus = require('http-status');
var log = require('./../utils/log.js');

module.exports = function (postRouter) {
  var router = express.Router();

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
        res.status(httpStatus.NOT_ACCEPTABLE).send('Not Acceptable');
      }
    });
  };


  router.get('/', getRoot);
  router.use(postRouter);

  router.use(function endRequest(req, res) {
    if (!res.locals.data || res.status === httpStatus.NOT_FOUND) {
      res.status(httpStatus.NOT_FOUND)
      res.locals.view = '404';
      res.locals.data = { message: 'Not Found' };
    }

    respond(req, res);
  })

  router.use(function handleError(err, req, res, next) {
    log.error(err.stack)

    res.status(httpStatus.INTERNAL_SERVER_ERROR);
    res.locals.view = '500';
    res.locals.data = { message: 'Internal Server Error' }

    respond(req, res);
  })

  return router;
}