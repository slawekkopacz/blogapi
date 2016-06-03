var should = require('should');
var request = require('supertest');
var server = require('../../server');

describe('server', () => {

  var blogapiServer;

  beforeEach(() => {
    blogapiServer = server.create();
  });

  it('Request with Accept json should return json', done => {
    request(blogapiServer)
      .get('/')
      .accept('json')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(done);
  });

  it('Request with Accept html should return html', done => {
    request(blogapiServer)
      .get('/')
      .accept('html')
      .expect(200)
      .expect('Content-Type', /html/)
      .end(done);
  });

  it('Request without Accept should return json (default)', done => {
    request(blogapiServer)
      .get('/')
      .accept('html')
      .expect(200)
      .expect('Content-Type', /html/)
      .end(done);
  });

  it('Request with Accept of unknown value should return 406 (Not Acceptable)', done => {
    request(blogapiServer)
      .get('/')
      .accept('html')
      .expect(200)
      .expect('Content-Type', /html/)
      .end(done);
  });

  it('GET / should return Hello World!', done => {
    request(blogapiServer)
      .get('/')
      .accept('json')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect({ message: 'Hello World!' })
      .end(done);
  });

  it('GET /unknown should return 404 (Not Found)', done => {
    request(blogapiServer)
      .get('/unknown')
      .expect(404, done);
  });
});
