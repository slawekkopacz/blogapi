var should = require('should');
var request = require('supertest');
var httpStatus = require('http-status');
var server = require('../../server');

describe('server (general)', () => {

  var blogapiServer;

  beforeEach(() => {
    blogapiServer = server.create();
  });

  it('Request with Accept json should return json', done => {
    request(blogapiServer)
      .get('/')
      .accept('json')

      .expect(httpStatus.OK)
      .expect('Content-Type', /json/)
      .end(done);
  });

  it('Request with Accept html should return html', done => {
    request(blogapiServer)
      .get('/')
      .accept('html')

      .expect(httpStatus.OK)
      .expect('Content-Type', /html/)
      .end(done);
  });

  it('Request without Accept should return json (default)', done => {
    request(blogapiServer)
      .get('/')
      .accept('html')

      .expect(httpStatus.OK)
      .expect('Content-Type', /html/)
      .end(done);
  });

  it('Request with Accept of unknown value should return 406 (Not Acceptable)', done => {
    request(blogapiServer)
      .get('/')
      .accept('html')

      .expect(httpStatus.OK)
      .expect('Content-Type', /html/)
      .end(done);
  });

  it('GET / should return Hello World!', done => {
    request(blogapiServer)
      .get('/')
      .accept('json')

      .expect(httpStatus.OK)
      .expect('Content-Type', /json/)
      .expect({ message: 'Hello World!' })
      .end(done);
  });

  it('GET /unknown should return 404 (Not Found)', done => {
    request(blogapiServer)
      .get('/unknown')

      .expect(httpStatus.NOT_FOUND, done);
  });
});
