var server = require('./server');

var listener = server.create().listen(3000, function () {
  console.log(`Server running @ ${listener.address().address}:${listener.address().port}`);
});