module.exports = function (Model) {

  return {
    getAll,
    getById,
    save,
    isValidModelId: id => Model.isValidId(id),
  }

  function getAll(callback) {
    find({}, function (err, posts) {
      if (err) {
        return callback(err);
      }
      callback(null, posts);
    });
  }

  function getById(id, callback) {
    findOne({ _id: id }, function (err, result) {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  }

  function find(filter, callback) {
    Model.find(filter).exec(function (err, result) {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  }

  function findOne(filter, callback) {
    Model.findOne(filter).exec(function (err, result) {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  }

  function save(obj, callback) {
    var document = new Model(obj);
    document.save(function (err, savedDocument) {
      if (err) {
        return callback(err);
      }
      callback(null, savedDocument);
    });
  }
}