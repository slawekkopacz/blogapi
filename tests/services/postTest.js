var should = require('should');
var mongoose = require('mongoose');
var async = require('async');
var assert = require('assert');
var config = require('./../../config');
var db = require('./../../db')(config.test.db.connString);
var Post = require('./../../models').Post;
var postService = require('./../../services/service.js')(Post);

describe('postService', function () {

  beforeEach(cleanPostsCollection);

  describe('save', function () {

    it('should save post document', function (done) {

      var post = {
        title: 'Testy test',
        body: 'Bodie talk',
        postedDate: new Date(2016, 5, 27, 23, 59, 45),
      }

      postService.save(post, function (err, savedPost) {
        if (err) throw err;

        savedPost.title.should.equal(post.title);
        savedPost.body.should.equal(post.body);
        savedPost.postedDate.getTime().should.equal(post.postedDate.getTime());
        done();
      });
    });
  });

  describe('getAll', function () {

    beforeEach(insertTestPostDocuemnts);

    it('should return all posts', function (done) {

      var preexistingPostDocumentCount = 4;
      postService.getAll(function (err, posts) {
        posts.should.be.instanceof(Array)
          .and.have.lengthOf(preexistingPostDocumentCount);
        done();
      });
    });
  });

  describe('getAll (special cases)', function () {

    it('should return one post in array if only one exists', function (done) {

      async.series([
        cb => insertOnePostDocument(null, cb),

        function (cb) {
          postService.getAll(function (err, posts) {
            if (err) return cb(err);

            posts.should.be.instanceof(Array).and.have.lengthOf(1);
            cb();
          })
        }
      ], done);
    });

    it('should return empty array if none exists', function (done) {

      postService.getAll(function (err, posts) {
        if (err) return cb(err);

        posts.should.be.instanceof(Array).and.be.empty();
        done();
      });
    });
  });

  describe('getById', function () {

    beforeEach(insertTestPostDocuemnts);

    it('should return right post if it exists', function (done) {
      var idOfExisitngPost = '574d79da3d616b171df30002';
      postService.getById(idOfExisitngPost, function (err, post) {
        if (err) throw err;
        post.id.should.equal(idOfExisitngPost);
        done();
      });
    });

    it('should return null if post with given id doesn\'t exist', function (done) {
      postService.getById('574d79da3d616b171df38888', function (err, post) {
        if (err) throw err;
        assert(!post);
        done();
      });
    });
  });

});


function cleanPostsCollection() {
  mongoose.connection.db.dropCollection('posts', function (err) {
    if (err && err.message !== 'ns not found')
      throw err;
  });
}

function insertTestPostDocuemnts() {
  Post.collection.insert(require('./postTest_InsertData.js'), function (err) {
    if (err)
      throw err;
  });
}

function insertOnePostDocument(doc, callback) {
  var post = doc || {
    title: 'Testy test',
    body: 'Bodie talk',
    postedDate: new Date(2016, 5, 27, 23, 59, 45),
  }

  postService.save(post, function (err, savedPost) {
    if (err) throw err;
    callback();
  });
}