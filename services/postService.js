var Post = require('./../models').Post;

module.exports = {
  getAll: getAll,
  find: find,
}

function getAll(callback) {
  find({}, function (err, result) {
    if (err) {
      return callback(err);
    }
    callback(null, result);
  });
}

function find(filter, callback) {
  Post.find(filter).exec(function (err, result) {
    if (err) {
      return callback(err);
    }
    callback(null, result);
  });
}