var config = require('./config');
var db = require('./db');
var server = require('./server');

var listener = server.create().listen(config.server.port, function () {
  console.log(`Server running @ ${listener.address().address}:${listener.address().port}`);
});