var should = require('should');
var config = require('./../../config');
var db = require('./../../db')(config.test.db.connString);
var Post = require('./../../models').Post;
var postService = require('./../../services/service.js')(Post);
var mongoose = require('mongoose');

describe('postService', function () {

  beforeEach(cleanPostsCollection);
  beforeEach(insertTestPostDocuemnts);

  describe('save', function () {

    it('should save post document', function (done) {

      var post = {
        title: 'Testy test',
        body: 'Bodie talk',
        postedDate: new Date(2016, 05, 27, 23, 59, 45),
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

  describe('getAll', function() {

    it('should return all posts', function (done) {

      var preexistingPostDocumentCount = 4;
      postService.getAll(function (err, posts) {
        posts.length.should.equal(preexistingPostDocumentCount);
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
  Post.collection.insert(require('./postServiceTest_InsertData.js'), function (err) {
    if (err)
      throw err;
  });
}