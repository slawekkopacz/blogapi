var should = require('should');
var request = require('supertest');
var mongoose = require('mongoose');
var async = require('async');
var httpStatus = require('http-status');
var config = require('./../../config');
var db = require('./../../db')(config.test.db.connString);
var Post = require('./../../models').Post;
var server = require('../../server');

describe('server (/posts)', () => {

  var blogapiServer;

  beforeEach(() => blogapiServer = server.create());

  describe('on empty posts collection', () => {

    before(() => deleteTestPostDocuemnts());
    after(() => deleteTestPostDocuemnts());

    it('GET /posts should return empty array if no post exists', done => {
      request(blogapiServer)
        .get('/posts')
        .accept('json')

        .expect(httpStatus.OK)
        .expect('Content-Type', /json/)
        .expect([])
        .end(done);
    });

    it('GET /posts should return array of lenght 1 if only one post exists', done => {
      async.series([
        cb => insertPostDocument({ title: 'Super Post' }, cb),

        cb => request(blogapiServer)
          .get('/posts')
          .accept('json')

          .expect(httpStatus.OK)
          .expect('Content-Type', /json/)
          .expect(res => res.body.should.be.instanceof(Array).and.have.lengthOf(1))
          .expect(res => res.body[0].title.should.equal('Super Post'))
          .end(cb)
      ], done);
    });

  });


  describe('on pre-loaded posts collection', () => {

    before(() => deleteTestPostDocuemnts());
    before(() => insertTestPostDocuemnts());
    after(() => deleteTestPostDocuemnts());


    it('GET /posts should return all posts', done => {
      request(blogapiServer)
        .get('/posts')
        .accept('json')

        .expect(httpStatus.OK)
        .expect('Content-Type', /json/)
        .expect(require('./serverPosts.js.expectedData.js'))
        .end(done);
    });

    it('GET /posts/:id should return post with given id if it exists', done => {
      request(blogapiServer)
        .get('/posts/574d79da3d616b171df30002')
        .accept('json')

        .expect(httpStatus.OK)
        .expect('Content-Type', /json/)
        .expect({
          id: '574d79da3d616b171df30002',
          title: 'Post 2',
          body: 'Body 2',
          postedDate: '2012-04-24T18:00:00.001Z',
        })
        .end(done);
    });

    it('GET /posts/:id should return (404) Not Found if post with given id doesn\'t exist', done => {
      request(blogapiServer)
        .get('/posts/not-existing-id')
        .accept('json')

        .expect(httpStatus.NOT_FOUND)
        .end(done);
    });

    it('POST /posts should create new post and return (201) Created status, '
      + 'uri in Location header and crated post in body', done => {
        request(blogapiServer).post('/posts')
          .type('json')
          .accept('json')
          .send({ title: 'Super Post' })

          .expect(httpStatus.CREATED)
          .expect('Content-Type', /json/)
            .expect(res => res.headers.location.should
              .match(new RegExp(`http:\/\/127\.0\.0\.1:\\d{4,}\/posts\/${res.body.id}`)))
          .expect(res => res.body.title.should.equal('Super Post'))
        .end(done);
    });

    it('POST /posts should return 400 (Bad Request) if Content-Type not specified', done => {
      request(blogapiServer)
        .post('/posts')
        //.type('json') //Content-Type not specified
        .accept('json')
        .send(`{ "title": "Super Post" }`)

        .expect(httpStatus.BAD_REQUEST)
        .end(done);
    });

    it('POST /posts should return 400 (Bad Request) if body is empty', done => {
      request(blogapiServer)
        .post('/posts')
        .type('json')
        .accept('json')
        //.send({ title: 'Super Post' }) // Empty body

        .expect(httpStatus.BAD_REQUEST)
        .end(done);
    });

    it('POST /posts should return 400 (Bad Request) if body is invalid', done => {
      request(blogapiServer)
        .post('/posts')
        .type('json')
        .accept('json')
        .send(`invalid (json) body`)

        .expect(httpStatus.BAD_REQUEST)
        .end(done);
    });
  });
});


function insertTestPostDocuemnts() {
  Post.collection.insert(require('./serverPosts.js.testData.js'), err => {
    if (err)
      throw err;
  });
}

function deleteTestPostDocuemnts() {
  mongoose.connection.db.dropCollection('posts', function (err) {
    if (err && err.message !== 'ns not found')
      throw err;
  });
}

function insertPostDocument(obj, callback) {
  var post = obj || {
    title: 'Testy test',
    body: 'Bodie talk',
    postedDate: new Date(2016, 5, 27, 23, 59, 45),
  }

  new Post(post).save(function (err, savedPost) {
    if (err) throw err;
    callback(null, savedPost);
  });
}