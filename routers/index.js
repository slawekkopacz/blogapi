var express = require('express');
var httpStatus = require('http-status');
var log = require('./../utils/log.js');

module.exports = function (postRouter) {
  var router = express.Router();

  function getRoot(req, res, next) {
    res.locals.view = 'index';
    res.locals.data = { message: "Hello World!" };
    return next();
  }

  function respond(req, res, next) {
    res.format({
      json: () => res.json(res.locals.data),
      html: () => res.render(res.locals.view, res.locals.data),
      text: () => res.send(res.locals.data),
      'default': () => res.status(httpStatus.NOT_ACCEPTABLE).send('Not Acceptable'),
    });
  };


  router.get('/', getRoot);
  router.use(postRouter);

  router.use(function endRequest(req, res) {

    let isBadRequest = res.statusCode === httpStatus.BAD_REQUEST;
    let isNotFound = !res.locals.data || res.statusCode === httpStatus.NOT_FOUND;

    if (isBadRequest) {
      res.status(httpStatus.BAD_REQUEST);
      res.locals.data = { message: 'Bad Request' };
      //TODO view?
    } else if (isNotFound) {
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