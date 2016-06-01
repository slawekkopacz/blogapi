var log = require('./utils/log');
var config = require('./config');
var db = require('./db')(config.db.connString);
var server = require('./server');

var listener = server.create().listen(config.server.port, function () {
  log.info(`Server running @ ${listener.address().address}:${listener.address().port}`);
});

listener.timeout = 20000;