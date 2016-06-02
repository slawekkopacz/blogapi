var should = require('should');
var request = require('supertest');
var server = require('../../server');

describe('server', function () {

  var blogapiServer;

  beforeEach(function () {
    blogapiServer = server.create();
  });

  it('GET / should return Hello World!', function (done) {
    request(blogapiServer)
      .get('/')
      .expect({ message: 'Hello World!' })
      .expect(200, done);
  });
});