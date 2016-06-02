var winston = require('winston');
var config = require('./../config');

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({
      filename: config.log.filepath || 'logfile.log',
      json: false,
      timestamp: () => new Date().toISOString(),
      formatter: (options) => {
        return options.timestamp() + ' ' + options.level.toUpperCase()
          + '\t' + (options.message || '')
          + (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '');
      }
    })
  ]
});

module.exports = logger;