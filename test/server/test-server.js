var should = require('should');
var server = require('../../server');
var request = require('supertest');

describe('server', function () {

  var blogapiServer;

  beforeEach(function () {
    blogapiServer = server.create();
  });

  it('GET / should return Hello World!', function (done) {
    request(blogapiServer)
      .get('/')
      .expect('Hello World!')
      .expect(200, done);
  });
});