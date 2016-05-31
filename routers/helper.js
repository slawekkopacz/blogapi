module.exports = function (options) {
//TODO
//var defaultFormat = (options && options.defaultFormat) || 'json';

  function getRequestedFormat(req) {
    return req.params.format || req.query.format || undefined;//defaultFormat;
  }

  return {
    getRequestedFormat: getRequestedFormat, 
  }
}